
using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Teams;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class TeamsController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetTeams()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTeam(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeam([FromBody] Team team)
        {   
            return HandleResult( await Mediator.Send(new Create.Command { Team = team }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTeam(Guid id, [FromBody] Team team)
        {
            team.Id = id;

            return HandleResult(await Mediator.Send(new Edit.Command { Team = team }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}