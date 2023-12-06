namespace Domain
{
    public class Match
    {
        public Guid Id { get; set; }
        public DateTime Date{get;set;}
        public Team FirstTeam { get; set; }
        public Team SecondTeam { get; set; }
        public int GoalsScoredFirstTeam { get; set; }
        public int GoalsScoredSecondTeam { get; set; }
    }
}