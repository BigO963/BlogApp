using BlogApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.Server.Context
{
    //THe database context
    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options) :
            base(options)
        {

        }
        public DbSet<Blog> Blogs { get; set; }
    }
}
