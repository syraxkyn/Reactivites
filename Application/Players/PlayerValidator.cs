using Domain;
using FluentValidation;

namespace Application.Players
{
    public class PlayerValidator:AbstractValidator<Player>
    {
        public PlayerValidator()
        {
            RuleFor(x=>x.Name).NotEmpty();
        }
    }
}