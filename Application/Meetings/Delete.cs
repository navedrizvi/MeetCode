using System.Net;
using System.Threading;
using MediatR;
using Persistence;
using System;
using System.Threading.Tasks;
using Application.Errors;

namespace Application.Meetings
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            public DataContext _context { get; }
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken ct)
            {
                var meeting = await _context.Meetings.FindAsync(request.Id);
                if (meeting == null)
                    throw new RestException(HttpStatusCode.NotFound, new { meeting = "Not found" });
                _context.Remove(meeting);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");

            }
        }
    }
}