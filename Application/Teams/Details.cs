using Persistence;
using MediatR;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Application.Posts;

namespace Application.Teams
{
    public class Details
    {
        public class Query : IRequest<Result<TeamDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<TeamDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<TeamDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var team = await _context.Teams.Include(t=>t.Players)
                .ProjectTo<TeamDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<TeamDto>.Success(team);
            }
        }
    }
}