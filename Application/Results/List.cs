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

namespace Application.Results
{
    public class List
    {
        public class Query : IRequest<Result<List<ResultDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ResultDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ResultDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _context.Results
                .ProjectTo<ResultDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

                return Result<List<ResultDto>>.Success(results);
            }
        }
    }
}