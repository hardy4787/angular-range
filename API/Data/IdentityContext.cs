using API.Entities;
using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class IdentityContext: IdentityDbContext
    {
        public IdentityContext(DbContextOptions<IdentityContext> options): base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new EmployeeConfiguration());
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
    }
}
