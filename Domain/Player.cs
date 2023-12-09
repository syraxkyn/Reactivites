namespace Domain
{
    public class Player
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Goals { get; set; } = 0;
        public int Assists { get; set; } = 0;
        public Guid TeamId { get; set; }
        public Team Team { get; set; }
    }
}