using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Title {get;set;}
        public string Text {get;set;}
        public DateTime Date{get;set;} = DateTime.UtcNow;
        public AppUser Author{get;set;}
        public ICollection<Comment> Comments {get;set;} = new List<Comment>();

    }
}