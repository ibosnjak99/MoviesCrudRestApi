using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesRestApi.Data;
using MoviesRestApi.DTO;
using MoviesRestApi.Models;
using System.Security.Cryptography;
using System.Text;

namespace MoviesRestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(UserDto createUserRequest)
        {
            var user = new User();

            var users = await _context.Users.ToListAsync();

            foreach (var singleUser in users)
            {
                if (singleUser.Username == createUserRequest.Username)
                {
                    return BadRequest("Data taken");
                }
            }

            var hashed = CreatePasswordHash(createUserRequest.Password);

            user.Username = createUserRequest.Username;
            user.Role = "User";
            user.PasswordHash = hashed;

            try
            {
                _context.Users.Add(user);

                await _context.SaveChangesAsync();

                return Ok(user);
            } catch
            {
                return BadRequest();
            }

        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(UserDto loginUserRequest)
        {
            var hashed = CreatePasswordHash(loginUserRequest.Password);

            var users = await _context.Users.ToListAsync(); 

            foreach(var user in users)
            {
                if (user.Username == loginUserRequest.Username && user.PasswordHash == hashed)
                {
                    return Ok(user);
                }
            }

            return BadRequest("Invalid data");
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User updatedUser, string role)
        {
            if (role.ToLower() != "admin")
            {
                return Unauthorized();
            }

            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return BadRequest("User not found.");

            user.Username = updatedUser.Username;
            user.Role = updatedUser.Role;

            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id, string role)
        {
            if (role.ToLower() != "admin")
            {
                return Unauthorized();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private string CreatePasswordHash(string password)
        {
            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(password);
            var hashedPassword = sha.ComputeHash(asByteArray);
            return Convert.ToBase64String(hashedPassword);
        }
    }
}
