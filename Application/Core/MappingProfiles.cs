using Application.Comments;
using Application.Players;
using Application.Posts;
using Application.Teams;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Post, Post>();
            CreateMap<Post, PostDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Author.UserName));
            CreateMap<Team, TeamDto>();
            CreateMap<Player, Player>();
            CreateMap<Player, PlayerDto>()
                .ForMember(d => d.TeamName, o => o.MapFrom(s => s.Team.Name));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.Bio));
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName));

        }
    }
}