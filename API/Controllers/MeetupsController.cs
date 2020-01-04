using System.Threading;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Threading.Tasks;
using Domain;
using System.Collections.Generic;
using Application.Meetings;
using System;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController] //gives automatic http status codes
    public class MeetupsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public MeetupsController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Meeting>>> List() //ct are not essential, just a ref
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Meeting>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command { Id = id });
        }
    }
}