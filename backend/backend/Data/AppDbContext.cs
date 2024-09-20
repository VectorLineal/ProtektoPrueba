
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Reflection.Metadata;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DbSet<User> Users { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }

        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to postgres with connection string from app settings
            options.UseNpgsql(Configuration.GetConnectionString("WebApiDatabase"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Default values
            modelBuilder.Entity<Models.Task>()
                .Property(b => b.Completed)
                .HasDefaultValue(false);
            modelBuilder.Entity<Models.Task>()
                .Property(b => b.PublishedOn)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            //Relationships
            modelBuilder.Entity<User>()
                .HasMany(e => e.Tasks)
                .WithOne(e => e.User)
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.ClientCascade);
            modelBuilder.Entity<Models.Task>()
                .HasOne(e => e.User)
                .WithMany(e => e.Tasks)
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.ClientCascade);
        }
    }
}