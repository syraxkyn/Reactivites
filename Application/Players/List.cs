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
            public PlayerParams Params { get; set; }
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
                .Where(d=>d.Position ==request.Params.Position)
                .ProjectTo<PlayerDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

                // Console.WriteLine(request.Params.Position);

                // if(request.Params.Position!=null){
                //     query.Where(d=>d.Position ==request.Params.Position);
                // }

                return Result<PagedList<PlayerDto>>.Success(
                    await PagedList<PlayerDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}