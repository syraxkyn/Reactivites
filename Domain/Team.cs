namespace Domain
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int ScoredGoals { get; set; } = 0;
        public int ConcededGoals { get; set; } = 0;
        public int Points{get;set;} = 0;
        public ICollection<Player> Players {get;set;} = new List<Player>();
    }
}