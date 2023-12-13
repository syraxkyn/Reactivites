namespace Domain
{
    public class Result
    {
        public Guid Id { get; set; }
        public int ScoredGoals { get; set; } = 0;
        public int ConcededGoals { get; set; } = 0;
        public int Points { get; set; } = 0;
        public Guid TeamId { get; set; }
        public Team Team { get; set; }
    }
}