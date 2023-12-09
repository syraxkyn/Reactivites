
using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Players;

namespace API.Controllers
{
    public class PlayersController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetPlayers()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetPlayer(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlayer([FromBody] Player player)
        {   
            return HandleResult( await Mediator.Send(new Create.Command { Player = player }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPlayer(Guid id, [FromBody] Player player)
        {
            player.Id = id;

            return HandleResult(await Mediator.Send(new Edit.Command { Player = player }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}