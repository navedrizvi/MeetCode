using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;
using System.Net;

namespace Application.Meetings
{
    public class Details
    {
        public class Query : IRequest<Meeting>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Meeting>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Meeting> Handle(Query request, CancellationToken cancellationToken)
            {
                var meeting = await _context.Meetings.FindAsync(request.Id);
                if (meeting == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Meeting = "Not found" });

                return meeting;
            }
        }
    }
}