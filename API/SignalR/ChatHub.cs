using Application.Messages;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MessageHub : Hub
    {
        private readonly IMediator _mediator;

        public MessageHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendMessage(Create.Command command)
        {
            var message = await _mediator.Send(command);

            await Clients.Group(command.MatchId.ToString())
                .SendAsync("ReceiveMessage", message.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var matchId = httpContext.Request.Query["matchId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, matchId);
            var result = await _mediator.Send(new List.Query{MatchId = Guid.Parse(matchId)});
            await Clients.Caller.SendAsync("LoadMessages", result.Value);
        }
    }
}