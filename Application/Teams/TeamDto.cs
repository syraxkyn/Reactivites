using Application.Profiles;
using Domain;

namespace Application.Teams
{
    public class TeamDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int ScoredGoals{get;set;}
        public int ConcededGoals{get;set;}
        public int Points{get;set;}
        public ICollection<Player> Players {get;set;} = new List<Player>();
    }
}