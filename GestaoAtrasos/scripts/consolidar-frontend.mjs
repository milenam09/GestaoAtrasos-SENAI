import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sources = ['src', 'Front-End', 'PerfilGestor', 'Telas Alunos', 'Telas AQV', 'Telas Iniciais', 'Telas Professor'];
const obsolete = sources.slice(1);
if (!obsolete.some(name => fs.existsSync(path.join(root, name)))) throw new Error('Migração já concluída. Consulte docs/consolidacao-frontend.json e use npm run check:sources para validar a estrutura atual.');
const ignored = new Set(['node_modules', 'dist', 'distribuicao', 'build', '.git', 'obj', 'bin', '.vs']);
const extensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.webp', '.gif', '.woff', '.woff2']);
const slash = p => p.replaceAll('\\', '/');
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const all = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name) || entry.isSymbolicLink()) continue;
    const filename = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(filename); else all.push(filename);
  }
}
for (const dir of sources) if (fs.existsSync(path.join(root, dir))) walk(path.join(root, dir));
const files = new Map();
const discarded = [];
for (const filename of all) {
  const rel = slash(path.relative(root, filename));
  const ext = path.extname(filename).toLowerCase();
  if (!extensions.has(ext)) continue;
  const buffer = fs.readFileSync(filename);
  const text = /\.(?:[jt]sx?|css)$/.test(ext) ? buffer.toString('utf8').replace(/^\uFEFF/, '').replaceAll('\r\n', '\n') : null;
  const scaffold = !rel.startsWith('src/') && (
    /(?:^|\/)(?:main\.[jt]sx|vite-env\.d\.ts|(?:vite|vitest|eslint|postcss|tailwind)\.config\.[jt]s|routeTree\.gen\.ts|router\.tsx|server\.ts|start\.ts)$/.test(rel)
    || /\/(?:test|routes)\//.test(rel)
    || /\/(?:error-capture|error-page|lovable-error-reporting)\.ts$/.test(rel)
    || (text && /reactLogo|viteLogo|Get started|Click on the Vite and React logos/.test(text))
    || /(?:react|vite)(?:-hero)?\.svg$/.test(rel)
    || /PlaceholderPage\.(jsx|css)$/.test(rel)
  );
  if (scaffold) { discarded.push(rel); continue; }
  files.set(filename.toLowerCase(), { filename, rel, ext, buffer, text, deps: [] });
}
const lookup = p => files.get(path.resolve(p).toLowerCase());
function resolveFile(base) {
  for (const suffix of ['', '.jsx', '.js', '.tsx', '.ts', '.css', '/index.jsx', '/index.js', '/index.tsx', '/index.ts']) {
    const found = lookup(base + suffix); if (found) return found;
  }
}
function projectDir(file) {
  let dir = path.dirname(file.filename);
  while (dir.startsWith(root)) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
    if (dir === root) break;
    dir = path.dirname(dir);
  }
  return root;
}
function resolveImport(file, spec) {
  if (!spec.startsWith('.') && !spec.startsWith('@/') && !spec.startsWith('/')) return;
  const clean = spec.split(/[?#]/)[0];
  const project = projectDir(file);
  const base = clean.startsWith('@/') ? path.join(project, 'src', clean.slice(2)) : clean.startsWith('/') ? path.join(project, 'public', clean.slice(1)) : path.resolve(path.dirname(file.filename), clean);
  let found = resolveFile(base);
  if (found) return found;
  if (clean.endsWith('/layout/Sidebar')) return resolveFile(path.join(root, 'Front-End/src/components/layout/Sidebar'));
  if (clean.endsWith('/hero.png') && /Telas Iniciais/.test(file.rel)) return lookup(path.join(root, 'Front-End/src/assets/hero.png'));
  if (/icone-(gestor|professor|aluno)\.png$/.test(clean)) return lookup(path.join(root, 'src/assets', path.basename(clean)));
  if (file.rel.includes('NovaTurmaAQV') && clean === './components/Menu') return resolveFile(path.join(project, 'src/components/Menu/Menu')) || lookup(path.join(root, 'src/pages/MenuAqv.jsx'));
  if (clean.startsWith('/assets/')) found = resolveFile(path.join(project, 'src', clean.slice(1)));
  if (found) return found;
  // Several prototypes already contained incorrect relative asset paths.
  const name = path.basename(clean).toLowerCase();
  const matches = [...files.values()].filter(f => path.basename(f.filename).toLowerCase() === name);
  const local = matches.filter(f => f.filename.startsWith(project + path.sep));
  const candidates = local.length ? local : matches;
  if (candidates.length === 1 || (candidates.length && new Set(candidates.map(f => sha(f.buffer))).size === 1)) return candidates[0];
  return undefined;
}
const importPattern = /((?:\bfrom\s*|\bimport\s*|\bimport\s*\(\s*)["'])([^"']+)(["'])/g;
const urlPattern = /url\(\s*(["']?)([^)"']+)\1\s*\)/g;
let missing = [];
for (const file of files.values()) {
  if (file.text === null) continue;
  const matches = file.ext === '.css' ? [...file.text.matchAll(urlPattern)].map(m => m[2]) : [...file.text.matchAll(importPattern)].map(m => m[2]).concat([...file.text.matchAll(/\b(?:src|href)=["'](\/[^"'\n]+\.(?:png|jpg|jpeg|svg|ico|webp))["']/g)].map(m => m[1]));
  for (const spec of matches) {
    if (!spec.startsWith('.') && !spec.startsWith('@/') && !spec.startsWith('/')) continue;
    const dependency = resolveImport(file, spec);
    if (dependency) file.deps.push({ spec, target: dependency });
    else missing.push({ file: file.rel, reference: spec });
  }
}
// Keep business screens and their dependency graph, rather than carrying along
// Vite demos, unused UI-library components, router shells or duplicated builds.
const roots = [...files.values()].filter(file => {
  if (file.rel.startsWith('src/')) return true;
  if (file.text === null || file.ext === '.css') return false;
  if (/\/services\//.test(file.rel)) return true;
  if (!/\.[jt]sx$/.test(file.rel) || /\/components\/ui\//.test(file.rel)) return false;
  if (/\/(?:Menu|Sidebar|Icons|icons)\.[jt]sx$/.test(file.rel)) return false;
  if (/\/App\.[jt]sx$/.test(file.rel)) return /useState|const estatisticas|const alunosIniciais/.test(file.text) && file.text.length > 2500;
  return true;
});
const reachable = new Set();
function visit(file) { if (reachable.has(file)) return; reachable.add(file); for (const dep of file.deps) visit(dep.target); }
roots.forEach(visit);
for (const [key, file] of files) if (!reachable.has(file)) { discarded.push(file.rel); files.delete(key); }
missing = missing.filter(item => [...files.values()].some(f => f.rel === item.file));
// Compare both content and resolved dependencies: identically named files can
// refer to different menus or styles and must not be combined accidentally.
let signatures = new Map([...files.values()].map(f => [f, sha(f.text?.trim() ?? f.buffer)]));
for (let iteration = 0; iteration < 6; iteration++) {
  const next = new Map();
  for (const file of files.values()) {
    let content = file.text?.trim();
    if (content !== undefined) for (const dep of file.deps) content = content.split(dep.spec).join(`dependency:${signatures.get(dep.target)}`);
    next.set(file, sha(content ?? file.buffer));
  }
  signatures = next;
}
const priority = file => file.rel.startsWith('src/') ? 0 : file.rel.startsWith('Front-End/src/') ? 1 : 2;
const groups = new Map();
for (const file of [...files.values()].sort((a, b) => priority(a) - priority(b) || a.rel.localeCompare(b.rel))) {
  const key = file.ext + ':' + signatures.get(file);
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(file);
}
function role(file) {
  if (/Login|Telas Iniciais|\/TelaInicial\//i.test(file.rel)) return 'acesso';
  if (/AQV|Gestor|GerarQr|Qr-code|alunos-aqv|InicioAQV|\/Os\//i.test(file.rel)) return 'gestor';
  if (/Professor|AtlasTech|MinhasTurmas|Acolhimento/i.test(file.rel)) return 'professor';
  if (/Iniciais|Login|Tela-Inicial|\/TelaInicial\//i.test(file.rel)) return 'acesso';
  return 'aluno';
}
function feature(file) {
  const project = projectDir(file);
  return project === root || slash(path.relative(root, project)) === 'Front-End' ? slug(path.basename(path.dirname(file.filename))) : slug(path.basename(project));
}
function destination(file) {
  const r = role(file);
  if (file.rel === 'src/App.jsx' || file.rel === 'src/main.jsx') return file.rel;
  if (file.text === null) return `src/assets/${slug(path.basename(file.filename, file.ext))}${file.ext}`;
  if (file.ext === '.css') return `src/css/${r}/${path.basename(file.filename)}`;
  if (/\/(?:services)\//.test(file.rel)) return `src/services/${path.basename(file.filename)}`;
  if (/mockAluno/.test(file.rel)) return 'src/data/mockAluno.js';
  if (/\/(?:lib|hooks)\//.test(file.rel)) return `src/${file.rel.includes('/hooks/') ? 'hooks' : 'lib'}/${path.basename(file.filename)}`;
  if (/\/(?:components\/ui)\//.test(file.rel)) return `src/components/ui/${path.basename(file.filename)}`;
  if (/Menu|Sidebar|Icons|icons\.jsx/.test(path.basename(file.filename)) || /\/layout\//.test(file.rel)) return `src/components/navigation/${r}/${path.basename(file.filename)}`;
  const name = /^App\./.test(path.basename(file.filename)) ? `Pagina-${feature(file)}${file.ext}` : path.basename(file.filename);
  return `src/pages/${r}/${name}`;
}
const used = new Set();
for (const group of groups.values()) {
  const canonical = group[0]; let target = destination(canonical);
  if (used.has(target.toLowerCase())) {
    const suffix = target.endsWith('.module.css') ? '.module.css' : canonical.ext;
    target = target.slice(0, -suffix.length) + '-' + signatures.get(canonical).slice(0, 8) + suffix;
  }
  used.add(target.toLowerCase());
  for (const file of group) file.destination = target;
}
const relative = (file, target) => { const value = slash(path.relative(path.dirname(file.destination), target.destination)); return value.startsWith('.') ? value : './' + value; };
const external = new Set();
for (const group of groups.values()) {
  const file = group[0];
  if (file.text === null) continue;
  let content = file.text;
  if (file.ext === '.css') {
    content = content.replace(urlPattern, (whole, quote, spec) => { const dep = resolveImport(file, spec); return dep ? `url("${relative(file, dep)}")` : whole; });
  } else {
    content = content.replace(/from\s*(['"])@tanstack\/react-router\1/g, 'from "react-router-dom"');
    content = content.replace(importPattern, (whole, start, spec, end) => {
      const dep = resolveImport(file, spec);
      if (dep) return start + relative(file, dep) + end;
      if (!spec.startsWith('.') && !spec.startsWith('@/')) external.add(spec);
      return whole;
    });
    content = content.replace(/\b(src|href)=(['"])(\/[^'"\n]+\.(?:png|jpg|jpeg|svg|ico|webp))\2/g, (whole, attr, quote, spec) => {
      const dep = resolveImport(file, spec);
      return dep ? `${attr}={new URL(${JSON.stringify(relative(file, dep))}, import.meta.url).href}` : whole;
    });
  }
  file.output = content;
}
const report = {
  sources: obsolete,
  filesAnalyzed: all.length,
  uniqueFiles: groups.size,
  duplicateCopies: [...groups.values()].reduce((sum, g) => sum + g.length - 1, 0),
  removedScaffolding: discarded,
  missingReferences: missing,
  externalPackages: [...external].sort(),
  mapping: [...files.values()].map(f => ({ from: f.rel, to: f.destination })),
};
if (!process.argv.includes('--apply')) {
  fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs/consolidacao-frontend.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ...report, mapping: undefined, removedScaffolding: discarded.length }, null, 2));
} else {
  if (!obsolete.some(name => fs.existsSync(path.join(root, name)))) throw new Error('As pastas antigas já foram consolidadas. Não execute a migração novamente.');
  const backup = path.join(os.tmpdir(), `GestaoAtrasos-fontes-${Date.now()}.json.gz`);
  const snapshot = all.map(filename => ({ path: slash(path.relative(root, filename)), content: fs.readFileSync(filename).toString('base64') }));
  fs.writeFileSync(backup, zlib.gzipSync(JSON.stringify(snapshot)));
  if (JSON.parse(zlib.gunzipSync(fs.readFileSync(backup))).length !== snapshot.length) throw new Error('Falha ao verificar backup');
  report.backup = backup;
  for (const group of groups.values()) {
    const file = group[0]; const output = path.join(root, file.destination);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, file.output ?? file.buffer);
  }
  // Delete old authored sources only after every canonical destination exists.
  for (const file of files.values()) if (!used.has(file.rel.toLowerCase()) && file.rel.startsWith('src/')) fs.unlinkSync(file.filename);
  for (const name of obsolete) {
    const target = path.resolve(root, name);
    if (path.dirname(target) !== root || !obsolete.includes(path.basename(target))) throw new Error('Unsafe cleanup target');
    if (fs.existsSync(target)) fs.rmSync(target, { recursive: true });
  }
  function removeEmpty(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) if (entry.isDirectory()) removeEmpty(path.join(dir, entry.name));
    if (dir !== path.join(root, 'src') && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
  }
  removeEmpty(path.join(root, 'src'));
  fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs/consolidacao-frontend.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ uniqueFiles: groups.size, duplicateCopies: report.duplicateCopies, backup, missingReferences: missing }, null, 2));
}
