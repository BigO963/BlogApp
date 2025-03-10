using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogApp.Server.Context;
using BlogApp.Server.Models;

namespace BlogApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly BlogDbContext _context;

        public BlogsController(BlogDbContext context)
        {
            _context = context;
        }

        // GET: api/Blogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blog>>> GetBlogs()
        {
            return await _context.Blogs.ToListAsync();
        }

        // POST: api/Blogs
        [HttpPost]
        public async Task<ActionResult<Blog>> PostBlog(Blog blog)
        {
            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBlog", new { id = blog.Id }, blog);
        }

        // DELETE: api/Blogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }

            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
