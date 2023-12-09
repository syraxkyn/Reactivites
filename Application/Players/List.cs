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

namespace Application.Players
{
    public class List
    {
        public class Query : IRequest<Result<List<PlayerDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<PlayerDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<PlayerDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var players = await _context.Players
                .ProjectTo<PlayerDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

                return Result<List<PlayerDto>>.Success(players);
            }
        }
    }
}