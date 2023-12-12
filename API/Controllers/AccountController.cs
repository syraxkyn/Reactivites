using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized();
            // var role = await _userManager.GetRolesAsync(user);
            // string roleName = role[0];
            // AppRole userRole = await _roleManager.FindByNameAsync(roleName);
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (result)
            {
                var roles = await _userManager.GetRolesAsync(user);
                //user.Role = userRole;
                Console.WriteLine("user ok");
                Console.WriteLine(user.Email);
                string userRole = roles[0];
                return CreateUserObject(user, userRole);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem(ModelState);
            }

            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem(ModelState);
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            await _userManager.AddToRoleAsync(user, "User");
            if (result.Succeeded)
            {
                return CreateUserObject(user, "User");
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            var roles = await _userManager.GetRolesAsync(user);
            string userRole = roles[0];
            return CreateUserObject(user, userRole);
        }

        private UserDto CreateUserObject(AppUser user, string role)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Role = role,
                Token = _tokenService.CreateToken(user, role),
                Username = user.UserName
            };
        }
    }
}