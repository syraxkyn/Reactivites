
using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Matches;

namespace API.Controllers
{
    public class MatchesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetMatches()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetMatch(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateMatch([FromBody] Match match)
        {   
            return HandleResult( await Mediator.Send(new Create.Command { Match = match }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditMatch(Guid id, [FromBody]Match match)
        {
            match.Id = id;

            return HandleResult(await Mediator.Send(new Edit.Command { Match = match }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMatch(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}