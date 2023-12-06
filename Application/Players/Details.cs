using Persistence;
using MediatR;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Application.Posts;

namespace Application.Players
{
    public class Details
    {
        public class Query : IRequest<Result<PlayerDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PlayerDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<PlayerDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var player = await _context.Players
                .ProjectTo<PlayerDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<PlayerDto>.Success(player);
            }
        }
    }
}