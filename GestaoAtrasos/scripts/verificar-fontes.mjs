import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(root, 'package.json'));
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file); else files.push(file);
  }
}
walk(path.join(root, 'src'));
const code = files.filter(file => /\.[jt]sx?$/.test(file));
const errors = [];
const packages = new Set();
for (const file of code) {
  const content = fs.readFileSync(file, 'utf8');
  if (/^(?:<<<<<<<|=======|>>>>>>>)/m.test(content)) errors.push(`Marcador de conflito: ${file}`);
  for (const match of content.matchAll(/(?:from\s*|import\s*|import\s*\(\s*)['"]([^'"]+)['"]/g)) {
    const spec = match[1];
    if (!spec.startsWith('.')) { packages.add(spec); continue; }
    const target = path.resolve(path.dirname(file), spec);
    if (!['', '.js', '.jsx', '.ts', '.tsx', '.css', '/index.js', '/index.jsx'].some(suffix => fs.existsSync(target + suffix))) errors.push(`Import inexistente: ${file} → ${spec}`);
  }
}
for (const spec of packages) {
  try { require.resolve(spec); } catch { errors.push(`Dependência não instalada: ${spec}`); }
}
if (errors.length) throw new Error(errors.join('\n'));
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'senai-verificar-'));
const entry = path.join(temporary, 'entry.js');
fs.writeFileSync(entry, code.filter(file => !file.endsWith(path.sep + 'main.jsx')).map((file, index) => `export * as modulo${index} from ${JSON.stringify(file.replaceAll('\\', '/'))};`).join('\n'));
try {
  await build({ root, configFile: path.join(root, 'vite.config.js'), logLevel: 'warn', build: { write: false, emptyOutDir: false, minify: false, lib: { entry, formats: ['es'] }, rollupOptions: { external: [...packages] } } });
  console.log(`Validação concluída: ${code.length} módulos, imports locais e dependências conferidos.`);
} finally {
  fs.unlinkSync(entry);
  fs.rmdirSync(temporary);
}
