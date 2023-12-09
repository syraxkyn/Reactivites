namespace Domain
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<Player> Players {get;set;} = new List<Player>();
    }
}