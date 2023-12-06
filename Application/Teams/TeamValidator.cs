using Domain;
using FluentValidation;

namespace Application.Teams
{
    public class TeamValidator:AbstractValidator<Team>
    {
        public TeamValidator()
        {
            RuleFor(x=>x.Name).NotEmpty();
        }
    }
}