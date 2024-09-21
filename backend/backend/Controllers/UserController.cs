using backend.Services;
using backend.Templates;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace backend.Controllers
{
    //[EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private IConfiguration _config;

        public UserController(IUserService userService, IConfiguration config) {
            _userService = userService;
            _config = config;
        }
        [HttpPost]
        public async Task<IActionResult> InsertAsync(UserTemplate insertUser) {
            var id = await _userService.InsertAsync(insertUser);
            return Created(string.Empty, new { id });
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserTemplate loginRequest)
        {
            int loginResult = await _userService.Login(loginRequest);
            if (loginResult <= 0) {
                return Unauthorized("Failed to Log In.");
            }
            else
            {
                //If login usrename and password are correct then proceed to generate token

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var Sectoken = new JwtSecurityToken(_config["Jwt:Issuer"],
                  _config["Jwt:Issuer"],
                  null,
                  expires: DateTime.Now.AddMinutes(120),
                  signingCredentials: credentials);

                var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

                return Ok(new LoginResponseTemplate { Id = loginResult, Token = token});
            }
            
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
