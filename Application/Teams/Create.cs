using Application.Core;
using Application.Interfaces;
using Application.Posts;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Teams
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Team Team { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Team).SetValidator(new TeamValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                bool team = await _context.Teams.AnyAsync(x => x.Name == request.Team.Name);
                if (team) return Result<Unit>.Failure("Team already exists");
                _context.Teams.Add(request.Team);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create activity");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}