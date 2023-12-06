namespace Domain
{
    public class Player
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public Guid TeamId { get; set; }
        public Team Team { get; set; }
    }
}