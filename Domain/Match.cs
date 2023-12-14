namespace Domain
{
    public class Match
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public Guid FirstTeamId { get; set; }
        public Guid SecondTeamId { get; set; }
        public Team FirstTeam { get; set; }
        public Team SecondTeam { get; set; }
        public int GoalsScoredFirstTeam { get; set; } = 0;
        public int GoalsScoredSecondTeam { get; set; } = 0;
        public bool Ended{get;set;} = false;
        public ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}