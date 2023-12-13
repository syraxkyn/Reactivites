using Persistence;
using MediatR;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Application.Posts;

namespace Application.Results
{
    public class Details
    {
        public class Query : IRequest<Result<ResultDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ResultDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<ResultDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.Results
                .ProjectTo<ResultDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<ResultDto>.Success(result);
            }
        }
    }
}