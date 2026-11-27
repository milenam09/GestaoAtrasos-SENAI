USE master;
GO

CREATE DATABASE GestaoAtraso;
GO

USE GestaoAtraso;
GO

SET XACT_ABORT ON;
GO

CREATE TABLE dbo.TipoUsuario (
    id_TipoUsuario INT IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_TipoUsuario PRIMARY KEY,
    nomeTipo NVARCHAR(50) NOT NULL,
    descricao NVARCHAR(100) NULL
);
GO

CREATE TABLE dbo.Usuario (
    id_usuario INT IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_Usuario PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NULL,
    senha NVARCHAR(255) NOT NULL,
    cpf NVARCHAR(11) NULL,
    data_nascimento DATE NULL,
    tipoUsuario INT NULL,
    turma_id INT NULL,

    CONSTRAINT FK_Usuario_TipoUsuario FOREIGN KEY (tipoUsuario)
        REFERENCES dbo.TipoUsuario(id_TipoUsuario)
);
GO

CREATE TABLE dbo.Turma (
    id_turma INT IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_Turma PRIMARY KEY,
    curso NVARCHAR(100) NOT NULL,
    periodo NVARCHAR(30) NOT NULL,
    turno NVARCHAR(20) NOT NULL,
    professor INT NULL,
    sigla NVARCHAR(20) NULL,
    horario_entrada TIME NOT NULL
        CONSTRAINT DF_Turma_HorarioEntrada DEFAULT '07:30',
    limite_atrasos_consecutivos INT NOT NULL
        CONSTRAINT DF_Turma_LimiteAtrasos DEFAULT 2,

    CONSTRAINT FK_Turma_Professor FOREIGN KEY (professor)
        REFERENCES dbo.Usuario(id_usuario)
);
GO

CREATE TABLE dbo.Justificativas (
    id_justificativas INT IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_Justificativas PRIMARY KEY,
    tipo NVARCHAR(50) NOT NULL,
    descricao NVARCHAR(500) NOT NULL,
    arquivo_url NVARCHAR(255) NULL,
    data_envio DATETIME NULL
        CONSTRAINT DF_Justificativas_DataEnvio DEFAULT GETDATE()
);
GO

CREATE TABLE dbo.Atestados (
    id_atestados INT IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_Atestados PRIMARY KEY,
    justificativas_id INT NOT NULL,
    arquivo_url NVARCHAR(255) NOT NULL,
    data_emissao DATE NULL,
    tipo_atestado NVARCHAR(100) NOT NULL,

    CONSTRAINT FK_Atestados_Justificativas FOREIGN KEY (justificativas_id)
        REFERENCES dbo.Justificativas(id_justificativas)
);
GO

CREATE TABLE dbo.Atrasos (
    id_atraso INT IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_Atrasos PRIMARY KEY,
    aluno_id INT NOT NULL,
    professor_id INT NOT NULL,
    data_atraso DATE NOT NULL,
    hora TIME NOT NULL,
    motivo NVARCHAR(500) NOT NULL,
    status NVARCHAR(30) NULL
        CONSTRAINT DF_Atrasos_Status DEFAULT N'Pendente',
    justificativa_id INT NULL,
    tipo_atraso NVARCHAR(50) NOT NULL,
    atestado INT NULL,

    CONSTRAINT FK_Atrasos_Aluno FOREIGN KEY (aluno_id)
        REFERENCES dbo.Usuario(id_usuario),
    CONSTRAINT FK_Atrasos_Professor FOREIGN KEY (professor_id)
        REFERENCES dbo.Usuario(id_usuario),
    CONSTRAINT FK_Atrasos_Justificativas FOREIGN KEY (justificativa_id)
        REFERENCES dbo.Justificativas(id_justificativas),
    CONSTRAINT FK_Atrasos_Atestados FOREIGN KEY (atestado)
        REFERENCES dbo.Atestados(id_atestados)
);
GO

CREATE TABLE dbo.AQV_TRATATIVAS (
    id_tratativa INT IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_AQV_TRATATIVAS PRIMARY KEY,
    atraso_id INT NOT NULL,
    usuario_id INT NOT NULL,
    data_tratativa DATETIME NULL
        CONSTRAINT DF_AQV_TRATATIVAS_Data DEFAULT GETDATE(),
    descricao NVARCHAR(500) NOT NULL,
    status_tratativa NVARCHAR(30) NULL
        CONSTRAINT DF_AQV_TRATATIVAS_Status DEFAULT N'Em andamento',
    observacao NVARCHAR(500) NULL,

    CONSTRAINT FK_AQV_TRATATIVAS_Atrasos FOREIGN KEY (atraso_id)
        REFERENCES dbo.Atrasos(id_atraso),
    CONSTRAINT FK_AQV_TRATATIVAS_Usuario FOREIGN KEY (usuario_id)
        REFERENCES dbo.Usuario(id_usuario)
);
GO

CREATE INDEX IX_Usuario_Turma ON dbo.Usuario(turma_id);
CREATE INDEX IX_Turma_Professor ON dbo.Turma(professor);
CREATE INDEX IX_Atrasos_Aluno_Data ON dbo.Atrasos(aluno_id, data_atraso);
CREATE INDEX IX_AQV_TRATATIVAS_Atraso ON dbo.AQV_TRATATIVAS(atraso_id);
GO
CREATE TRIGGER dbo.TR_Usuario_ValidarTurma
ON dbo.Usuario
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM inserted AS i
        WHERE i.turma_id IS NOT NULL
          AND NOT EXISTS (
              SELECT 1
              FROM dbo.Turma AS t WITH (UPDLOCK, HOLDLOCK)
              WHERE t.id_turma = i.turma_id
          )
    )
    BEGIN
        ROLLBACK TRANSACTION;
        THROW 50001, N'A turma informada para o usuario nao existe.', 1;
    END;
END;
GO

CREATE TRIGGER dbo.TR_Turma_ImpedirExclusaoComUsuarios
ON dbo.Turma
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM deleted AS d
        INNER JOIN dbo.Usuario AS u WITH (UPDLOCK, HOLDLOCK)
            ON u.turma_id = d.id_turma
    )
    BEGIN
        ROLLBACK TRANSACTION;
        THROW 50002, N'Nao e possivel excluir uma turma com usuarios vinculados.', 1;
    END;
END;
GO
