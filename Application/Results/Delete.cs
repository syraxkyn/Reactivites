using Application.Core;
using MediatR;
using Persistence;

namespace Application.Results
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var result = await _context.Results.FindAsync(request.Id);

                if (result == null) return null;

                _context.Remove(result);

                var dbSaveResult = await _context.SaveChangesAsync() > 0;

                if(!dbSaveResult) return Result<Unit>.Failure("Failed to delete the result");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}