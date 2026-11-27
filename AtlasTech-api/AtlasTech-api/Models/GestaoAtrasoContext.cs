using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AtlasTech_api.Models;

public partial class GestaoAtrasoContext : DbContext
{
    public GestaoAtrasoContext()
    {
    }

    public GestaoAtrasoContext(DbContextOptions<GestaoAtrasoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AqvTratativa> AqvTratativas { get; set; }

    public virtual DbSet<Atestado> Atestados { get; set; }

    public virtual DbSet<Atraso> Atrasos { get; set; }

    public virtual DbSet<Justificativa> Justificativas { get; set; }

    public virtual DbSet<TipoUsuario> TipoUsuarios { get; set; }

    public virtual DbSet<Turma> Turmas { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=GestaoAtraso;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AqvTratativa>(entity =>
        {
            entity.HasKey(e => e.IdTratativa);

            entity.ToTable("AQV_TRATATIVAS");

            entity.HasIndex(e => e.AtrasoId, "IX_AQV_TRATATIVAS_Atraso");

            entity.Property(e => e.IdTratativa).HasColumnName("id_tratativa");
            entity.Property(e => e.AtrasoId).HasColumnName("atraso_id");
            entity.Property(e => e.DataTratativa)
                .HasDefaultValueSql("(getdate())", "DF_AQV_TRATATIVAS_Data")
                .HasColumnType("datetime")
                .HasColumnName("data_tratativa");
            entity.Property(e => e.Descricao)
                .HasMaxLength(500)
                .HasColumnName("descricao");
            entity.Property(e => e.Observacao)
                .HasMaxLength(500)
                .HasColumnName("observacao");
            entity.Property(e => e.StatusTratativa)
                .HasMaxLength(30)
                .HasDefaultValue("Em andamento", "DF_AQV_TRATATIVAS_Status")
                .HasColumnName("status_tratativa");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Atraso).WithMany(p => p.AqvTratativas)
                .HasForeignKey(d => d.AtrasoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AQV_TRATATIVAS_Atrasos");

            entity.HasOne(d => d.Usuario).WithMany(p => p.AqvTratativas)
                .HasForeignKey(d => d.UsuarioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AQV_TRATATIVAS_Usuario");
        });

        modelBuilder.Entity<Atestado>(entity =>
        {
            entity.HasKey(e => e.IdAtestados);

            entity.Property(e => e.IdAtestados).HasColumnName("id_atestados");
            entity.Property(e => e.ArquivoUrl)
                .HasMaxLength(255)
                .HasColumnName("arquivo_url");
            entity.Property(e => e.DataEmissao).HasColumnName("data_emissao");
            entity.Property(e => e.JustificativasId).HasColumnName("justificativas_id");
            entity.Property(e => e.TipoAtestado)
                .HasMaxLength(100)
                .HasColumnName("tipo_atestado");

            entity.HasOne(d => d.Justificativas).WithMany(p => p.Atestados)
                .HasForeignKey(d => d.JustificativasId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Atestados_Justificativas");
        });

        modelBuilder.Entity<Atraso>(entity =>
        {
            entity.HasKey(e => e.IdAtraso);

            entity.HasIndex(e => new { e.AlunoId, e.DataAtraso }, "IX_Atrasos_Aluno_Data");

            entity.Property(e => e.IdAtraso).HasColumnName("id_atraso");
            entity.Property(e => e.AlunoId).HasColumnName("aluno_id");
            entity.Property(e => e.Atestado).HasColumnName("atestado");
            entity.Property(e => e.DataAtraso).HasColumnName("data_atraso");
            entity.Property(e => e.Hora).HasColumnName("hora");
            entity.Property(e => e.JustificativaId).HasColumnName("justificativa_id");
            entity.Property(e => e.Motivo)
                .HasMaxLength(500)
                .HasColumnName("motivo");
            entity.Property(e => e.ProfessorId).HasColumnName("professor_id");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValue("Pendente", "DF_Atrasos_Status")
                .HasColumnName("status");
            entity.Property(e => e.TipoAtraso)
                .HasMaxLength(50)
                .HasColumnName("tipo_atraso");

            entity.HasOne(d => d.Aluno).WithMany(p => p.AtrasoAlunos)
                .HasForeignKey(d => d.AlunoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Atrasos_Aluno");

            entity.HasOne(d => d.AtestadoNavigation).WithMany(p => p.Atrasos)
                .HasForeignKey(d => d.Atestado)
                .HasConstraintName("FK_Atrasos_Atestados");

            entity.HasOne(d => d.Justificativa).WithMany(p => p.Atrasos)
                .HasForeignKey(d => d.JustificativaId)
                .HasConstraintName("FK_Atrasos_Justificativas");

            entity.HasOne(d => d.Professor).WithMany(p => p.AtrasoProfessors)
                .HasForeignKey(d => d.ProfessorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Atrasos_Professor");
        });

        modelBuilder.Entity<Justificativa>(entity =>
        {
            entity.HasKey(e => e.IdJustificativas);

            entity.Property(e => e.IdJustificativas).HasColumnName("id_justificativas");
            entity.Property(e => e.ArquivoUrl)
                .HasMaxLength(255)
                .HasColumnName("arquivo_url");
            entity.Property(e => e.DataEnvio)
                .HasDefaultValueSql("(getdate())", "DF_Justificativas_DataEnvio")
                .HasColumnType("datetime")
                .HasColumnName("data_envio");
            entity.Property(e => e.Descricao)
                .HasMaxLength(500)
                .HasColumnName("descricao");
            entity.Property(e => e.Tipo)
                .HasMaxLength(50)
                .HasColumnName("tipo");
        });

        modelBuilder.Entity<TipoUsuario>(entity =>
        {
            entity.HasKey(e => e.IdTipoUsuario);

            entity.ToTable("TipoUsuario");

            entity.Property(e => e.IdTipoUsuario).HasColumnName("id_TipoUsuario");
            entity.Property(e => e.Descricao)
                .HasMaxLength(100)
                .HasColumnName("descricao");
            entity.Property(e => e.NomeTipo)
                .HasMaxLength(50)
                .HasColumnName("nomeTipo");
        });

        modelBuilder.Entity<Turma>(entity =>
        {
            entity.HasKey(e => e.IdTurma);

            entity.ToTable("Turma", tb => tb.HasTrigger("TR_Turma_ImpedirExclusaoComUsuarios"));

            entity.HasIndex(e => e.Professor, "IX_Turma_Professor");

            entity.Property(e => e.IdTurma).HasColumnName("id_turma");
            entity.Property(e => e.Curso)
                .HasMaxLength(100)
                .HasColumnName("curso");
            entity.Property(e => e.HorarioEntrada)
                .HasDefaultValue(new TimeOnly(7, 30, 0), "DF_Turma_HorarioEntrada")
                .HasColumnName("horario_entrada");
            entity.Property(e => e.LimiteAtrasosConsecutivos)
                .HasDefaultValue(2, "DF_Turma_LimiteAtrasos")
                .HasColumnName("limite_atrasos_consecutivos");
            entity.Property(e => e.Periodo)
                .HasMaxLength(30)
                .HasColumnName("periodo");
            entity.Property(e => e.Professor).HasColumnName("professor");
            entity.Property(e => e.Sigla)
                .HasMaxLength(20)
                .HasColumnName("sigla");
            entity.Property(e => e.Turno)
                .HasMaxLength(20)
                .HasColumnName("turno");

            entity.HasOne(d => d.ProfessorNavigation).WithMany(p => p.Turmas)
                .HasForeignKey(d => d.Professor)
                .HasConstraintName("FK_Turma_Professor");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario);

            entity.ToTable("Usuario", tb => tb.HasTrigger("TR_Usuario_ValidarTurma"));

            entity.HasIndex(e => e.TurmaId, "IX_Usuario_Turma");

            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Cpf)
                .HasMaxLength(11)
                .HasColumnName("cpf");
            entity.Property(e => e.DataNascimento).HasColumnName("data_nascimento");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Nome)
                .HasMaxLength(100)
                .HasColumnName("nome");
            entity.Property(e => e.Senha)
                .HasMaxLength(255)
                .HasColumnName("senha");
            entity.Property(e => e.TipoUsuario).HasColumnName("tipoUsuario");
            entity.Property(e => e.TurmaId).HasColumnName("turma_id");

            entity.HasOne(d => d.TipoUsuarioNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.TipoUsuario)
                .HasConstraintName("FK_Usuario_TipoUsuario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
