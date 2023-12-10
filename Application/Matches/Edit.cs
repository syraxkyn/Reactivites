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

                _mapper.Map(request.Match, match);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update match");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}