using Domain;
using FluentValidation;

namespace Application.Matches
{
    public class MatchValidator:AbstractValidator<Match>
    {
        public MatchValidator()
        {
            RuleFor(x=>x.FirstTeamId).NotEqual(x=>x.SecondTeamId).WithMessage("Вы не можете выбрать одну и ту же команду");
            RuleFor(x=>x.FirstTeamId).NotEmpty();
            RuleFor(x=>x.SecondTeamId).NotEmpty();
            RuleFor(x=>x.Date).NotEmpty();
        }
    }
}