using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<Post> Posts { get; set; }
        public int? RoleId { get; set; }
        public Role Role
        {
            get; set;
        }
    }
}