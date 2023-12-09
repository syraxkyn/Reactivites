using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Players
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Player Player { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
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
                var player = await _context.Players.FindAsync(request.Player.Id);
                request.Player.TeamId = player.TeamId;
                Console.WriteLine(player.TeamId);
                if (player == null) return null;

                _mapper.Map(request.Player, player);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update player");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}