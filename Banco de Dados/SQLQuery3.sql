USE GestaoAtraso;
GO

INSERT INTO TipoUsuario (nomeTipo, descricao)
VALUES
('Aluno', 'Acessa seus atrasos e justificativas'),
('Professor', 'Registra e acompanha atrasos'),
('Gestor', 'Acompanha os dados gerais'),
('AQV', 'Gerencia tratativas e justificativas');
GO

INSERT INTO Usuario
(nome, email, senha, cpf, data_nascimento, tipoUsuario)
VALUES
('Ana Silva', NULL, 'senha123', '12345678901', '2008-05-10', 1),
('Pedro Santos', NULL, 'senha123', '23456789012', '2007-08-15', 1),
('Carlos Souza', 'carlos@escola.com', 'senha123', NULL, '1990-03-20', 2),
('Mariana Lima', 'mariana@escola.com', 'senha123', NULL, '1985-07-12', 3),
('Juliana Costa', 'juliana@escola.com', 'senha123', NULL, '1995-11-25', 4);
GO

INSERT INTO Turma
(curso, periodo, turno, professor)
VALUES
('Desenvolvimento de Sistemas', '2026', 'Manha', 3),
('Administracao', '2026', 'Tarde', 3);
GO

INSERT INTO Justificativas
(tipo, descricao, arquivo_url)
VALUES
('Transporte', 'Atraso causado por problema no transporte publico', NULL),
('Saude', 'Consulta medica pela manha', 'arquivos/atestado1.pdf');
GO

INSERT INTO Atestados
(justificativas_id, arquivo_url, data_emissao, tipo_atestado)
VALUES
(2, 'arquivos/atestado1.pdf', '2026-10-20', 'Atestado medico');
GO

INSERT INTO Atrasos
(aluno_id, professor_id, data_atraso, hora, motivo,
 status, justificativa_id, tipo_atraso, atestado)
VALUES
(1, 3, '2026-10-20', '07:20', 'Onibus atrasou',
 'Pendente', 1, 'Entrada', NULL),

(2, 3, '2026-10-20', '13:15', 'Consulta medica',
 'Justificado', 2, 'Entrada', 1);
GO

INSERT INTO AQV_TRATATIVAS
(atraso_id, usuario_id, descricao, status_tratativa, observacao)
VALUES
(1, 5, 'Entrar em contato com o aluno para entender o ocorrido',
 'Em andamento', 'Aguardando retorno'),

(2, 5, 'Justificativa analisada pela AQV',
 'Concluida', 'Atestado recebido e analisado');
GO

SELECT * FROM TipoUsuario;
SELECT * FROM Usuario;
SELECT * FROM Turma;
SELECT * FROM Justificativas;
SELECT * FROM Atestados;
SELECT * FROM Atrasos;
SELECT * FROM AQV_TRATATIVAS;
GO