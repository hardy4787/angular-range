using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public sealed class IdentityContext: IdentityDbContext<User>
    {
        public IdentityContext(DbContextOptions<IdentityContext> options): base(options)
        {
            Database.Migrate();
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
    }
}
