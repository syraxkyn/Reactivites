using Application.Profiles;
using Domain;

namespace Application.Players
{
    public class PlayerDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string TeamName{get;set;}
    }
}