using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class UserRegistrationRequest
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
