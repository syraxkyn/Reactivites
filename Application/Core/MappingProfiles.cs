using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees.
                FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(d=>d.DisplayName,o=>o.MapFrom(s=>s.AppUser.DisplayName))
                .ForMember(d=>d.Username,o=>o.MapFrom(s=>s.AppUser.UserName))
                .ForMember(d=>d.Bio,o=>o.MapFrom(s=>s.AppUser.Bio));
            CreateMap<Comment, CommentDto>()
                .ForMember(d=>d.DisplayName,o=>o.MapFrom(s=>s.Author.DisplayName))
                .ForMember(d=>d.Username,o=>o.MapFrom(s=>s.Author.UserName));

        }
    }
}