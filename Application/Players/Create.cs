using Application.Core;
using Application.Interfaces;
using Application.Posts;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Players
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Player Player { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Player).SetValidator(new PlayerValidator());
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
                bool player = await _context.Players.AnyAsync(x => x.Name == request.Player.Name && x.Team.Id == request.Player.Team.Id);
                if (player) return Result<Unit>.Failure("Player already exists");
                _context.Players.Add(request.Player);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create player");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}