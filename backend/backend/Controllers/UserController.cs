using backend.Services;
using backend.Templates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService) {
            _userService = userService;
        }
        [HttpPost]
        public async Task<IActionResult> InsertAsync(UserTemplate insertUser) {
            var id = await _userService.InsertAsync(insertUser);
            return Created(string.Empty, new { id });
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var user = await _userService.GetAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            await _userService.DeleteAsync(id);
            return NoContent();
        }
    }
}
