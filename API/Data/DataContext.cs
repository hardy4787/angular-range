using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Database.Migrate();
        }
        public DbSet<Status> Statuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Status>().HasData(
                new Status[]
                {
                new Status { Id=1, StatusOption="option 1"},
                new Status { Id=2, StatusOption="option 2"},
                new Status { Id=3, StatusOption="option 3"}
                });
        }
    }
}
