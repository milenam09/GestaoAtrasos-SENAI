using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Models;

public partial class GestaoAtrasoContext : DbContext
{
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AqvTratativa>(entity =>
        {
            entity.HasKey(e => e.IdTratativa).HasName("PK__AQV_TRAT__0B9E3D50EDAA5884");

            entity.ToTable("AQV_TRATATIVAS");

            entity.Property(e => e.IdTratativa).HasColumnName("id_tratativa");
            entity.Property(e => e.AtrasoId).HasColumnName("atraso_id");
            entity.Property(e => e.DataTratativa)
                .HasDefaultValueSql("(getdate())")
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
                .HasDefaultValue("Em andamento")
                .HasColumnName("status_tratativa");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Atraso).WithMany(p => p.AqvTratativas)
                .HasForeignKey(d => d.AtrasoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AQV_TRATA__atras__72C60C4A");

            entity.HasOne(d => d.Usuario).WithMany(p => p.AqvTratativas)
                .HasForeignKey(d => d.UsuarioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AQV_TRATA__usuar__73BA3083");
        });

        modelBuilder.Entity<Atestado>(entity =>
        {
            entity.HasKey(e => e.IdAtestados).HasName("PK__Atestado__A1E28DE9C3F4B807");

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
                .HasConstraintName("FK__Atestados__justi__6754599E");
        });

        modelBuilder.Entity<Atraso>(entity =>
        {
            entity.HasKey(e => e.IdAtraso).HasName("PK__Atrasos__812682A89FD648C3");

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
                .HasDefaultValue("Pendente")
                .HasColumnName("status");
            entity.Property(e => e.TipoAtraso)
                .HasMaxLength(50)
                .HasColumnName("tipo_atraso");

            entity.HasOne(d => d.Aluno).WithMany(p => p.AtrasoAlunos)
                .HasForeignKey(d => d.AlunoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Atrasos__aluno_i__6B24EA82");

            entity.HasOne(d => d.AtestadoNavigation).WithMany(p => p.Atrasos)
                .HasForeignKey(d => d.Atestado)
                .HasConstraintName("FK__Atrasos__atestad__6E01572D");

            entity.HasOne(d => d.Justificativa).WithMany(p => p.Atrasos)
                .HasForeignKey(d => d.JustificativaId)
                .HasConstraintName("FK__Atrasos__justifi__6D0D32F4");

            entity.HasOne(d => d.Professor).WithMany(p => p.AtrasoProfessors)
                .HasForeignKey(d => d.ProfessorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Atrasos__profess__6C190EBB");
        });

        modelBuilder.Entity<Justificativa>(entity =>
        {
            entity.HasKey(e => e.IdJustificativas).HasName("PK__Justific__4C1210FD71C9495B");

            entity.Property(e => e.IdJustificativas).HasColumnName("id_justificativas");
            entity.Property(e => e.ArquivoUrl)
                .HasMaxLength(255)
                .HasColumnName("arquivo_url");
            entity.Property(e => e.DataEnvio)
                .HasDefaultValueSql("(getdate())")
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
            entity.HasKey(e => e.IdTipoUsuario).HasName("PK__TipoUsua__C435F32AC1A51E77");

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
            entity.HasKey(e => e.IdTurma).HasName("PK__Turma__C68D8BC4359F587F");

            entity.ToTable("Turma");

            entity.Property(e => e.IdTurma).HasColumnName("id_turma");
            entity.Property(e => e.Curso)
                .HasMaxLength(100)
                .HasColumnName("curso");
            entity.Property(e => e.Periodo)
                .HasMaxLength(30)
                .HasColumnName("periodo");
            entity.Property(e => e.Professor).HasColumnName("professor");
            entity.Property(e => e.Turno)
                .HasMaxLength(20)
                .HasColumnName("turno");

            entity.HasOne(d => d.ProfessorNavigation).WithMany(p => p.Turmas)
                .HasForeignKey(d => d.Professor)
                .HasConstraintName("FK__Turma__professor__619B8048");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__4E3E04AD418373F3");

            entity.ToTable("Usuario");

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

            entity.HasOne(d => d.TipoUsuarioNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.TipoUsuario)
                .HasConstraintName("FK__Usuario__tipoUsu__5EBF139D");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
