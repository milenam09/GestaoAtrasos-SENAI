USE GestaoAtraso;
GO

ALTER TABLE Usuario ADD turma_id INT NULL FOREIGN KEY REFERENCES Turma(id_turma);
GO

ALTER TABLE Turma ADD sigla NVARCHAR(20) NULL,
                    horario_entrada TIME NOT NULL DEFAULT '07:30',
                    limite_atrasos_consecutivos INT NOT NULL DEFAULT 2;
GO