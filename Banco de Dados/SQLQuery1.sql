CREATE DATABASE GestaoAtraso;
GO

USE GestaoAtraso;
GO

CREATE TABLE TipoUsuario (
    id_TipoUsuario INT IDENTITY(1,1) PRIMARY KEY,
    nomeTipo NVARCHAR(50) NOT NULL,
    descricao NVARCHAR(100)
);
GO

CREATE TABLE Usuario (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100),
    senha NVARCHAR(255) NOT NULL,
    cpf NVARCHAR(11),
    data_nascimento DATE,
    tipoUsuario INT,

    FOREIGN KEY (tipoUsuario)
        REFERENCES TipoUsuario(id_TipoUsuario)
);
GO

CREATE TABLE Turma (
    id_turma INT IDENTITY(1,1) PRIMARY KEY,
    curso NVARCHAR(100) NOT NULL,
    periodo NVARCHAR(30) NOT NULL,
    turno NVARCHAR(20) NOT NULL,
    professor INT,

    FOREIGN KEY (professor)
        REFERENCES Usuario(id_usuario)
);
GO

CREATE TABLE Justificativas (
    id_justificativas INT IDENTITY(1,1) PRIMARY KEY,
    tipo NVARCHAR(50) NOT NULL,
    descricao NVARCHAR(500) NOT NULL,
    arquivo_url NVARCHAR(255),
    data_envio DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Atestados (
    id_atestados INT IDENTITY(1,1) PRIMARY KEY,
    justificativas_id INT NOT NULL,
    arquivo_url NVARCHAR(255) NOT NULL,
    data_emissao DATE,
    tipo_atestado NVARCHAR(100) NOT NULL,

    FOREIGN KEY (justificativas_id)
        REFERENCES Justificativas(id_justificativas)
);
GO

CREATE TABLE Atrasos (
    id_atraso INT IDENTITY(1,1) PRIMARY KEY,
    aluno_id INT NOT NULL,
    professor_id INT NOT NULL,
    data_atraso DATE NOT NULL,
    hora TIME NOT NULL,
    motivo NVARCHAR(500) NOT NULL,
    status NVARCHAR(30) DEFAULT 'Pendente',
    justificativa_id INT,
    tipo_atraso NVARCHAR(50) NOT NULL,
    atestado INT,

    FOREIGN KEY (aluno_id)
        REFERENCES Usuario(id_usuario),

    FOREIGN KEY (professor_id)
        REFERENCES Usuario(id_usuario),

    FOREIGN KEY (justificativa_id)
        REFERENCES Justificativas(id_justificativas),

    FOREIGN KEY (atestado)
        REFERENCES Atestados(id_atestados)
);
GO

CREATE TABLE AQV_TRATATIVAS (
    id_tratativa INT IDENTITY(1,1) PRIMARY KEY,
    atraso_id INT NOT NULL,
    usuario_id INT NOT NULL,
    data_tratativa DATETIME DEFAULT GETDATE(),
    descricao NVARCHAR(500) NOT NULL,
    status_tratativa NVARCHAR(30) DEFAULT 'Em andamento',
    observacao NVARCHAR(500),

    FOREIGN KEY (atraso_id)
        REFERENCES Atrasos(id_atraso),

    FOREIGN KEY (usuario_id)
        REFERENCES Usuario(id_usuario)
);
GO

SELECT * FROM TipoUsuario;
SELECT * FROM Usuario;
SELECT * FROM Turma;
SELECT * FROM Justificativas;
SELECT * FROM Atestados;
SELECT * FROM Atrasos;
SELECT * FROM AQV_TRATATIVAS;
GO