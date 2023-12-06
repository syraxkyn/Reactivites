using Persistence;
using MediatR;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Posts
{
    public class Details
    {
        public class Query : IRequest<Result<PostDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PostDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<PostDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<PostDto>.Success(post);
            }
        }
    }
}