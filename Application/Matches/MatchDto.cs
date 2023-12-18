using Application.Profiles;
using Domain;

namespace Application.Matches
{
    public class MatchDto
    {
        public Guid Id { get; set; }
        public DateTime Date{get;set;}
        public Guid FirstTeamId{get;set;}
        public Guid SecondTeamId{get;set;}
        public string FirstTeamName { get; set; }
        public string SecondTeamName { get; set; }
        public int GoalsScoredFirstTeam { get; set; }
        public int GoalsScoredSecondTeam { get; set; }
        public bool Ended{get;set;}
    }
}