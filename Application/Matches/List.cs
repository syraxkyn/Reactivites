using Application.Core;
using Application.Posts;
using Application.Teams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Matches
{
    public class List
    {
        public class Query : IRequest<Result<List<MatchDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<MatchDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<MatchDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var matches = await _context.Matches
                .ProjectTo<MatchDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

                return Result<List<MatchDto>>.Success(matches);
            }
        }
    }
}