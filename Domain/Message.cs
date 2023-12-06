namespace Domain
{
    public class Message
    {
        public int Id {get;set;}
        public string Body{get;set;}
        public AppUser Author {get;set;}
        public Match Match{get;set;}
        public DateTime CreatedAt {get;set;} = DateTime.UtcNow;
    }
}