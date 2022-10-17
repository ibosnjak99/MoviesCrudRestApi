using Microsoft.EntityFrameworkCore;
using MoviesRestApi.Models;

namespace MoviesRestApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Genre> Genre { get; set; }
    }
}
