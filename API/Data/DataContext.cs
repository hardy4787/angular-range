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
        public DbSet<Inspection> Inspection { get; set; }
        public DbSet<InspectionType> InspectionTypes { get; set; }
        public DbSet<Status> Statuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InspectionType>().HasData(
                new InspectionType[]
                {
                new InspectionType { Id=1, InspectionName="type 1"},
                new InspectionType { Id=2, InspectionName="type 2"},
                new InspectionType { Id=3, InspectionName="type 3"}
                });
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
