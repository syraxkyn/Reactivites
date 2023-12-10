using Persistence;
using MediatR;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Application.Posts;

namespace Application.Matches
{
    public class Details
    {
        public class Query : IRequest<Result<MatchDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<MatchDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<MatchDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var match = await _context.Matches
                .ProjectTo<MatchDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<MatchDto>.Success(match);
            }
        }
    }
}