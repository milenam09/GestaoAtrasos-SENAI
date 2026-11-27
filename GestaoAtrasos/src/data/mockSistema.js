import { useState } from "react";

const STORAGE_KEY = "senai-demo-sistema-v1";

export const perfilProfessor = {
  nome: "Mariana Silva",
  nomeCurto: "Mariana",
  cargo: "Professora",
  nascimento: "14/05/1991",
  email: "mariana.silva@sp.senai.br",
  telefone: "(11) 98412-3300",
  turmasResumo: "T1A, T2B e T3A",
  turno: "Manhã / Tarde / Noite",
  unidade: 'Escola SENAI "Paulo Antonio Skaf" · Unidade 1.34',
};

export const perfilGestor = {
  nome: "Cris Costa",
  nomeCurto: "Cris Costa",
  cargo: "Gestor · Equipe AQV",
  nascimento: "22/08/1986",
  email: "cris.costa@sp.senai.br",
  telefone: "(11) 4225-2000",
  setor: "Assessoria de Qualidade de Vida (AQV)",
  turno: "Integral (08h00 às 17h00)",
  unidade: 'Escola SENAI "Paulo Antonio Skaf" · Unidade 1.34',
};

export const unidadeContato = {
  escola: 'Escola SENAI "Paulo Antonio Skaf"',
  subtitulo: "SENAI São Caetano do Sul · Cyber e IA (Dados fictícios de demonstração)",
  endereco: "Rua Niterói, 180 – Centro, São Caetano do Sul - SP, CEP: 09510-200",
  telefone: "(11) 4225-2000",
  whatsapp: "(11) 4225-2001",
  email: "secretaria.demo@example.com",
  horario: "Segunda a sexta-feira, das 08h00 às 17h00.",
  central: "(11) 4210-4455 (Telefone/WhatsApp)",
};

export const hojeFormatado = () => new Date().toLocaleDateString("pt-BR");

const estadoInicial = {
  turmas: [
    {
      id: "t1a",
      codigo: "T1A",
      curso: "Técnico em Desenvolvimento de Sistemas",
      turno: "Manhã",
      periodo: "1º semestre de 2026",
      horario: "07h45 - 11h15",
      sala: "Lab 04",
      capacidade: 32,
      totalAlunos: 28,
      atrasosHoje: 3,
      minhaTurma: true,
      diasAula: [
        { dia: "Segunda-feira", inicio: "07:45", fim: "11:15" },
        { dia: "Quarta-feira", inicio: "07:45", fim: "11:15" },
        { dia: "Sexta-feira", inicio: "07:45", fim: "11:15" },
      ],
    },
    {
      id: "t2b",
      codigo: "T2B",
      curso: "Técnico em Mecatrônica",
      turno: "Tarde",
      periodo: "2º semestre de 2026",
      horario: "13h30 - 17h00",
      sala: "Oficina 02",
      capacidade: 30,
      totalAlunos: 26,
      atrasosHoje: 2,
      minhaTurma: true,
      diasAula: [
        { dia: "Terça-feira", inicio: "13:30", fim: "17:00" },
        { dia: "Quinta-feira", inicio: "13:30", fim: "17:00" },
      ],
    },
    {
      id: "t3a",
      codigo: "T3A",
      curso: "Técnico em Eletrotécnica",
      turno: "Noite",
      periodo: "2º semestre de 2026",
      horario: "18h30 - 22h00",
      sala: "Lab 09",
      capacidade: 35,
      totalAlunos: 31,
      atrasosHoje: 1,
      minhaTurma: true,
      diasAula: [
        { dia: "Segunda-feira", inicio: "18:30", fim: "22:00" },
        { dia: "Quinta-feira", inicio: "18:30", fim: "22:00" },
      ],
    },
    {
      id: "t1b",
      codigo: "T1B",
      curso: "Técnico em Redes de Computadores",
      turno: "Integral",
      periodo: "1º semestre de 2026",
      horario: "08h00 - 17h00",
      sala: "Lab 02",
      capacidade: 32,
      totalAlunos: 30,
      atrasosHoje: 2,
      minhaTurma: false,
      diasAula: [
        { dia: "Segunda-feira", inicio: "08:00", fim: "17:00" },
        { dia: "Quarta-feira", inicio: "08:00", fim: "17:00" },
      ],
    },
    {
      id: "t2a",
      codigo: "T2A",
      curso: "Técnico em Informática para Internet",
      turno: "Manhã",
      periodo: "2º semestre de 2026",
      horario: "07h45 - 11h15",
      sala: "Lab 06",
      capacidade: 34,
      totalAlunos: 33,
      atrasosHoje: 2,
      minhaTurma: false,
      diasAula: [
        { dia: "Terça-feira", inicio: "07:45", fim: "11:15" },
        { dia: "Sexta-feira", inicio: "07:45", fim: "11:15" },
      ],
    },
    {
      id: "t3b",
      codigo: "T3B",
      curso: "Técnico em Automação Industrial",
      turno: "Tarde",
      periodo: "1º semestre de 2026",
      horario: "13h30 - 17h00",
      sala: "Lab 11",
      capacidade: 28,
      totalAlunos: 25,
      atrasosHoje: 1,
      minhaTurma: false,
      diasAula: [
        { dia: "Quarta-feira", inicio: "13:30", fim: "17:00" },
        { dia: "Sexta-feira", inicio: "13:30", fim: "17:00" },
      ],
    },
  ],
  alunos: [
    {
      id: 1,
      ra: "20260125",
      iniciais: "JS",
      cor: "#b91c1c",
      nome: "João Silva",
      turma: "T1A",
      email: "joao.silva@example.com",
      telefone: "(11) 99917-8195",
      ocorrencias: 8,
      ultimoAtraso: "27/11/2026",
      frequencia: 86,
      status: "Em andamento",
      observacao: "Atendimento pedagógico agendado com a equipe AQV devido a atrasos consecutivos.",
    },
    {
      id: 2,
      ra: "20260142",
      iniciais: "LF",
      cor: "#1d4ed8",
      nome: "Lucas Ferreira",
      turma: "T2B",
      email: "lucas.ferreira@example.com",
      telefone: "(11) 98840-1120",
      ocorrencias: 6,
      ultimoAtraso: "27/11/2026",
      frequencia: 89,
      status: "Pendente",
      observacao: "Aguardando retorno do responsável referente aos atrasos da semana.",
    },
    {
      id: 3,
      ra: "20260198",
      iniciais: "BS",
      cor: "#7c3aed",
      nome: "Beatriz Souza",
      turma: "T3A",
      email: "beatriz.souza@example.com",
      telefone: "(11) 99123-4410",
      ocorrencias: 4,
      ultimoAtraso: "26/11/2026",
      frequencia: 92,
      status: "Em andamento",
      observacao: "Justificativa de transporte em análise pela secretaria.",
    },
    {
      id: 4,
      ra: "20260204",
      iniciais: "RC",
      cor: "#0f766e",
      nome: "Rafael Costa",
      turma: "T2B",
      email: "rafael.costa@example.com",
      telefone: "(11) 99451-0092",
      ocorrencias: 4,
      ultimoAtraso: "25/11/2026",
      frequencia: 91,
      status: "Aguardando retorno",
      observacao: "Comprovante médico solicitado para abono do dia 25/11.",
    },
    {
      id: 5,
      ra: "20260219",
      iniciais: "JA",
      cor: "#b45309",
      nome: "Juliana Alves",
      turma: "T3A",
      email: "juliana.alves@example.com",
      telefone: "(11) 99702-5588",
      ocorrencias: 3,
      ultimoAtraso: "24/11/2026",
      frequencia: 95,
      status: "Concluída",
      observacao: "Ocorrências justificadas e encerradas após conversa com a tutoria.",
    },
    {
      id: 6,
      ra: "20260233",
      iniciais: "MM",
      cor: "#475569",
      nome: "Milena Mares",
      turma: "T1A",
      email: "milena.mares@example.com",
      telefone: "(11) 98211-7733",
      ocorrencias: 2,
      ultimoAtraso: "21/11/2026",
      frequencia: 97,
      status: "Concluída",
      observacao: "Atestado aprovado pela coordenação.",
    },
    {
      id: 7,
      ra: "20260251",
      iniciais: "AB",
      cor: "#15803d",
      nome: "Anna Beatriz",
      turma: "T2A",
      email: "anna.beatriz@example.com",
      telefone: "(11) 99331-2084",
      ocorrencias: 5,
      ultimoAtraso: "26/11/2026",
      frequencia: 88,
      status: "Pendente",
      observacao: "Pendência de assinatura dos responsáveis no termo de acompanhamento.",
    },
    {
      id: 8,
      ra: "20260277",
      iniciais: "IG",
      cor: "#9333ea",
      nome: "Isabela Garcia",
      turma: "T1B",
      email: "isabela.garcia@example.com",
      telefone: "(11) 99560-4411",
      ocorrencias: 3,
      ultimoAtraso: "20/11/2026",
      frequencia: 94,
      status: "Concluída",
      observacao: "Atendimento concluído sem pendências.",
    },
    {
      id: 9,
      ra: "20260301",
      iniciais: "BP",
      cor: "#d97706",
      nome: "Beatryz Paz",
      turma: "T2B",
      email: "beatryz.paz@example.com",
      telefone: "(11) 98711-9022",
      ocorrencias: 4,
      ultimoAtraso: "27/11/2026",
      frequencia: 90,
      status: "Em andamento",
      observacao: "Acompanhamento de pontualidade em andamento com a professora Mariana.",
    },
    {
      id: 10,
      ra: "20260318",
      iniciais: "PH",
      cor: "#0369a1",
      nome: "Pedro Henrique",
      turma: "T3B",
      email: "pedro.henrique@example.com",
      telefone: "(11) 98192-6614",
      ocorrencias: 2,
      ultimoAtraso: "19/11/2026",
      frequencia: 96,
      status: "Concluída",
      observacao: "Frequência regularizada.",
    },
  ],
  atrasos: [
    {
      id: "atr-1",
      data: "27/11/2026",
      alunoId: 1,
      aluno: "João Silva",
      turma: "T1A",
      previsto: "07:45",
      chegada: "08:09",
      motivo: "Transporte público",
      observacao: "Atraso na linha municipal de ônibus.",
      registradoPor: "Professora Mariana",
    },
    {
      id: "atr-2",
      data: "27/11/2026",
      alunoId: 2,
      aluno: "Lucas Ferreira",
      turma: "T2B",
      previsto: "13:30",
      chegada: "13:48",
      motivo: "Problemas pessoais",
      observacao: "Chegou após o início da oficina.",
      registradoPor: "Professora Mariana",
    },
    {
      id: "atr-3",
      data: "27/11/2026",
      alunoId: 9,
      aluno: "Beatryz Paz",
      turma: "T2B",
      previsto: "13:30",
      chegada: "13:42",
      motivo: "Transporte público",
      observacao: "Congestionamento na Av. Goiás.",
      registradoPor: "QR Code Portaria",
    },
    {
      id: "atr-4",
      data: "26/11/2026",
      alunoId: 3,
      aluno: "Beatriz Souza",
      turma: "T3A",
      previsto: "18:30",
      chegada: "18:52",
      motivo: "Trabalho / Estágio",
      observacao: "Saída tardia do estágio; enviou declaração.",
      registradoPor: "Professora Mariana",
    },
    {
      id: "atr-5",
      data: "26/11/2026",
      alunoId: 7,
      aluno: "Anna Beatriz",
      turma: "T2A",
      previsto: "07:45",
      chegada: "08:15",
      motivo: "Problemas de saúde",
      observacao: "Apresentou receituário na chegada.",
      registradoPor: "QR Code Portaria",
    },
  ],
  ocorrencias: [
    {
      id: "OS-00125",
      data: "27/11/2026",
      aluno: "João Silva",
      ra: "20260125",
      turma: "T1A",
      motivo: "Atraso recorrente",
      prioridade: "Alta",
      status: "Em andamento",
      responsavel: "Cris Costa (AQV)",
      descricao: "3º atraso consecutivo na semana. Conversa agendada para alinhamento de rotina.",
    },
    {
      id: "OS-00126",
      data: "27/11/2026",
      aluno: "Lucas Ferreira",
      ra: "20260142",
      turma: "T2B",
      motivo: "Atraso recorrente",
      prioridade: "Média",
      status: "Pendente",
      responsavel: "Mariana Silva (Prof.)",
      descricao: "Encaminhado para verificação de justificativa junto ao responsável.",
    },
    {
      id: "OS-00124",
      data: "26/11/2026",
      aluno: "Beatriz Souza",
      ra: "20260198",
      turma: "T3A",
      motivo: "Justificativa",
      prioridade: "Baixa",
      status: "Em andamento",
      responsavel: "Cris Costa (AQV)",
      descricao: "Declaração de estágio recebida para validação de horário flexível.",
    },
    {
      id: "OS-00123",
      data: "25/11/2026",
      aluno: "Rafael Costa",
      ra: "20260204",
      turma: "T2B",
      motivo: "Atestado médico",
      prioridade: "Média",
      status: "Aguardando retorno",
      responsavel: "Cris Costa (AQV)",
      descricao: "Aguardando envio do atestado médico digitalizado pelo portal do aluno.",
    },
    {
      id: "OS-00122",
      data: "25/11/2026",
      aluno: "Anna Beatriz",
      ra: "20260251",
      turma: "T2A",
      motivo: "Atraso recorrente",
      prioridade: "Alta",
      status: "Pendente",
      responsavel: "Cris Costa (AQV)",
      descricao: "Acumulou 5 ocorrências no bimestre; contato telefônico programado.",
    },
    {
      id: "OS-00121",
      data: "24/11/2026",
      aluno: "Juliana Alves",
      ra: "20260219",
      turma: "T3A",
      motivo: "Questão pessoal",
      prioridade: "Média",
      status: "Concluída",
      responsavel: "Cris Costa (AQV)",
      descricao: "Atendimento realizado e plano de pontualidade acordado com a aluna.",
    },
    {
      id: "OS-00120",
      data: "21/11/2026",
      aluno: "Milena Mares",
      ra: "20260233",
      turma: "T1A",
      motivo: "Atestado médico",
      prioridade: "Baixa",
      status: "Concluída",
      responsavel: "Cris Costa (AQV)",
      descricao: "Documento homologado e falta abonada.",
    },
    {
      id: "OS-00119",
      data: "20/11/2026",
      aluno: "Isabela Garcia",
      ra: "20260277",
      turma: "T1B",
      motivo: "Justificativa",
      prioridade: "Baixa",
      status: "Concluída",
      responsavel: "Cris Costa (AQV)",
      descricao: "Justificativa aprovada pela equipe AQV.",
    },
    {
      id: "OS-00118",
      data: "27/11/2026",
      aluno: "Beatryz Paz",
      ra: "20260301",
      turma: "T2B",
      motivo: "Atraso recorrente",
      prioridade: "Alta",
      status: "Aguardando retorno",
      responsavel: "Mariana Silva (Prof.)",
      descricao: "Notificação enviada ao responsável para ciência dos atrasos.",
    },
  ],
  atestados: [
    {
      id: "doc-101",
      data: "27/11/2026",
      aluno: "João Silva",
      turma: "T1A",
      tipo: "Atestado médico",
      arquivo: "atestado_joao_27-11.pdf",
      observacao: "Consulta odontológica no período da manhã.",
      status: "Em análise",
    },
    {
      id: "doc-102",
      data: "26/11/2026",
      aluno: "Beatriz Souza",
      turma: "T3A",
      tipo: "Declaração de estágio",
      arquivo: "declaracao_estagio_beatriz.pdf",
      observacao: "Comprovante de jornada até 18h00.",
      status: "Em análise",
    },
    {
      id: "doc-103",
      data: "25/11/2026",
      aluno: "Anna Beatriz",
      turma: "T2A",
      tipo: "Justificativa",
      arquivo: "justificativa_responsavel.jpg",
      observacao: "Assinatura do responsável por imprevisto familiar.",
      status: "Aprovado",
    },
    {
      id: "doc-104",
      data: "21/11/2026",
      aluno: "Milena Mares",
      turma: "T1A",
      tipo: "Atestado médico",
      arquivo: "atestado_milena_21-11.pdf",
      observacao: "Comprovante válido apresentado na secretaria.",
      status: "Aprovado",
    },
  ],
  notificacoes: [
    {
      id: "not-1",
      titulo: "Novo caso prioritário",
      descricao: "João Silva - T1A (OS-00125)",
      horario: "há 15 minutos",
      lida: false,
    },
    {
      id: "not-2",
      titulo: "Atestado enviado para análise",
      descricao: "Beatriz Souza - T3A",
      horario: "há 1 hora",
      lida: false,
    },
    {
      id: "not-3",
      titulo: "Ocorrência aguardando retorno",
      descricao: "Rafael Costa - T2B (OS-00123)",
      horario: "há 3 horas",
      lida: false,
    },
    {
      id: "not-4",
      titulo: "Caso concluído hoje",
      descricao: "Juliana Alves - T3A (OS-00121)",
      horario: "há 5 horas",
      lida: true,
    },
  ],
};

let memoriaSessao = estadoInicial;

function lerEstadoInicial() {
  try {
    const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (
      salvo &&
      Array.isArray(salvo.turmas) &&
      Array.isArray(salvo.alunos) &&
      Array.isArray(salvo.atrasos) &&
      Array.isArray(salvo.ocorrencias) &&
      Array.isArray(salvo.atestados)
    ) {
      return salvo;
    }
  } catch {
    // Usa os dados padrão se localStorage estiver indisponível
  }
  return memoriaSessao;
}

export function useMockSistema() {
  const [dados, setDados] = useState(lerEstadoInicial);

  function persistir(proximo) {
    memoriaSessao = proximo;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(proximo));
    } catch {
      // Ignora erro de armazenamento privado
    }
    setDados(proximo);
  }

  function adicionarTurma(novaTurma) {
    const turma = {
      id: `t-${Date.now()}`,
      codigo: novaTurma.codigo.trim().toUpperCase(),
      curso: novaTurma.curso.trim(),
      turno: novaTurma.turno,
      periodo: novaTurma.periodo || "2º semestre de 2026",
      horario: novaTurma.horario || "07h45 - 11h15",
      sala: novaTurma.sala || "Sala 01",
      capacidade: Number(novaTurma.capacidade) || 30,
      totalAlunos: Number(novaTurma.totalAlunos ?? novaTurma.capacidade) || 30,
      atrasosHoje: 0,
      minhaTurma: Boolean(novaTurma.minhaTurma),
      diasAula: novaTurma.diasAula || [
        { dia: "Segunda-feira", inicio: "07:45", fim: "11:15" },
      ],
    };

    persistir({
      ...dados,
      turmas: [turma, ...dados.turmas],
    });
    return turma;
  }

  function adicionarOS({ aluno, turma, motivo, prioridade, responsavel, descricao }) {
    const maior = dados.ocorrencias.reduce((max, item) => {
      const n = Number(String(item.id).replace(/\D/g, "")) || 0;
      return Math.max(max, n);
    }, 126);

    const alunoObj = dados.alunos.find((a) => a.nome === aluno);
    const nova = {
      id: `OS-${String(maior + 1).padStart(5, "0")}`,
      data: hojeFormatado(),
      aluno,
      ra: alunoObj?.ra || "20260000",
      turma,
      motivo,
      prioridade: prioridade || "Média",
      status: "Pendente",
      responsavel: responsavel || "Equipe AQV",
      descricao: descricao || "Ocorrência registrada no painel de demonstração.",
    };

    const notificacao = {
      id: `not-${Date.now()}`,
      titulo: "Nova Ordem de Serviço",
      descricao: `${nova.aluno} - ${nova.turma} (${nova.id})`,
      horario: "agora",
      lida: false,
    };

    const alunosAtualizados = dados.alunos.map((a) =>
      a.nome === aluno
        ? { ...a, ocorrencias: a.ocorrencias + 1, status: "Pendente" }
        : a
    );

    persistir({
      ...dados,
      ocorrencias: [nova, ...dados.ocorrencias],
      alunos: alunosAtualizados,
      notificacoes: [notificacao, ...dados.notificacoes],
    });

    return nova;
  }

  function atualizarStatusOS(id, novoStatus) {
    const ocorrencias = dados.ocorrencias.map((os) =>
      os.id === id ? { ...os, status: novoStatus } : os
    );
    persistir({ ...dados, ocorrencias });
  }

  function registrarAtraso({ alunoId, horarioChegada, motivo, observacao, abrirOS }) {
    const alunoObj = dados.alunos.find((a) => a.id === Number(alunoId));
    if (!alunoObj) return null;

    const turmaObj = dados.turmas.find((t) => t.codigo === alunoObj.turma);
    const previsto = turmaObj?.horario?.split("-")[0]?.trim().replace("h", ":") || "07:45";
    const hoje = hojeFormatado();

    const novoAtraso = {
      id: `atr-${Date.now()}`,
      data: hoje,
      alunoId: alunoObj.id,
      aluno: alunoObj.nome,
      turma: alunoObj.turma,
      previsto,
      chegada: horarioChegada,
      motivo,
      observacao: observacao || "Registro realizado pelo docente.",
      registradoPor: "Professora Mariana",
    };

    const turmas = dados.turmas.map((t) =>
      t.codigo === alunoObj.turma ? { ...t, atrasosHoje: t.atrasosHoje + 1 } : t
    );

    const alunos = dados.alunos.map((a) =>
      a.id === alunoObj.id
        ? {
            ...a,
            ultimoAtraso: hoje,
            ocorrencias: a.ocorrencias + (abrirOS ? 1 : 0),
            status: abrirOS ? "Em andamento" : a.status,
          }
        : a
    );

    let ocorrencias = dados.ocorrencias;
    let notificacoes = dados.notificacoes;

    if (abrirOS) {
      const maior = dados.ocorrencias.reduce((max, item) => {
        const n = Number(String(item.id).replace(/\D/g, "")) || 0;
        return Math.max(max, n);
      }, 126);
      const novaOS = {
        id: `OS-${String(maior + 1).padStart(5, "0")}`,
        data: hoje,
        aluno: alunoObj.nome,
        ra: alunoObj.ra,
        turma: alunoObj.turma,
        motivo: motivo === "Transporte público" ? "Atraso recorrente" : motivo,
        prioridade: "Média",
        status: "Em andamento",
        responsavel: "Mariana Silva (Prof.)",
        descricao: observacao || `Atraso registrado às ${horarioChegada} (${motivo}).`,
      };
      ocorrencias = [novaOS, ...ocorrencias];
      notificacoes = [
        {
          id: `not-${Date.now()}`,
          titulo: "Atraso e OS registrados",
          descricao: `${alunoObj.nome} - ${alunoObj.turma} (${novaOS.id})`,
          horario: "agora",
          lida: false,
        },
        ...notificacoes,
      ];
    }

    persistir({
      ...dados,
      atrasos: [novoAtraso, ...dados.atrasos],
      turmas,
      alunos,
      ocorrencias,
      notificacoes,
    });

    return novoAtraso;
  }

  function atualizarStatusAtestado(id, novoStatus) {
    const atestados = dados.atestados.map((doc) =>
      doc.id === id ? { ...doc, status: novoStatus } : doc
    );
    persistir({ ...dados, atestados });
  }

  function marcarNotificacoesLidas() {
    const notificacoes = dados.notificacoes.map((n) => ({ ...n, lida: true }));
    persistir({ ...dados, notificacoes });
  }

  function resetarDemo() {
    persistir(estadoInicial);
  }

  return {
    dados,
    adicionarTurma,
    adicionarOS,
    atualizarStatusOS,
    registrarAtraso,
    atualizarStatusAtestado,
    marcarNotificacoesLidas,
    resetarDemo,
  };
}
