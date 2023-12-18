using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Matches
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Match Match { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Match).SetValidator(new MatchValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var match = await _context.Matches.FindAsync(request.Match.Id);
                if (match == null) return null;
                var firstTeam = await _context.Teams.FindAsync(request.Match.FirstTeamId);
                var secondTeam = await _context.Teams.FindAsync(request.Match.SecondTeamId);
                if (firstTeam == null || secondTeam == null) return null;
                if (match.Ended != true)
                {
                    //голы первой команды
                    firstTeam.ScoredGoals += request.Match.GoalsScoredFirstTeam;
                    firstTeam.ConcededGoals += request.Match.GoalsScoredSecondTeam;
                    //голы второй команды
                    secondTeam.ScoredGoals += request.Match.GoalsScoredSecondTeam;
                    secondTeam.ConcededGoals += request.Match.GoalsScoredFirstTeam;
                    if (firstTeam.ScoredGoals > secondTeam.ScoredGoals)
                    {
                        firstTeam.Points += 3;
                    }
                    if (secondTeam.ScoredGoals > firstTeam.ScoredGoals)
                    {
                        secondTeam.Points += 3;
                    }
                    if (secondTeam.ScoredGoals == firstTeam.ScoredGoals)
                    {
                        firstTeam.Points += 1;
                        secondTeam.Points += 1;
                    }
                    _mapper.Map(request.Match, match);
                    match.GoalsScoredFirstTeam = request.Match.GoalsScoredFirstTeam;
                    match.GoalsScoredSecondTeam = request.Match.GoalsScoredSecondTeam;

                    match.Ended = true;

                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result) return Result<Unit>.Failure("Ошибка при обновлении матча");
                }
                else
                {
                    return Result<Unit>.Failure("Матч уже закончился");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}