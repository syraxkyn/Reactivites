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

namespace Application.Teams
{
    public class List
    {
        public class Query : IRequest<Result<List<TeamDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<TeamDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<TeamDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var teams = await _context.Teams
                .ProjectTo<TeamDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

                return Result<List<TeamDto>>.Success(teams);
            }
        }
    }
}