using Application.Core;
using Application.Posts;
using Application.Teams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Players
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<PlayerDto>>> 
        { 
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<PlayerDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<PlayerDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Players
                .ProjectTo<PlayerDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

                return Result<PagedList<PlayerDto>>.Success(
                    await PagedList<PlayerDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}