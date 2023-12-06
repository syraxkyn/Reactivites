
using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Posts;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class PostsController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetPost(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Posts.Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] Post post)
        {   
            return HandleResult( await Mediator.Send(new Create.Command { Post = post }));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditPost(Guid id, [FromBody] Post post)
        {
            post.Id = id;

            return HandleResult(await Mediator.Send(new Edit.Command { Post = post }));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}