using Application.Profiles;
using Domain;

namespace Application.Posts
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Text {get;set;}
        public DateTime Date { get; set; }
        public string HostUsername {get;set;}
        public Profile Author {get;set;}
    }
}