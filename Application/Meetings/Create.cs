using System.Threading;
using MediatR;
using Persistence;
using System;
using System.Threading.Tasks;
using Domain;

namespace Application.Meetings
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            public DataContext Context { get; }
            public Handler(DataContext context)
            {
                Context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken ct)
            {
                var meeting = new Meeting
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };

                Context.Meetings.Add(meeting);
                var success = await Context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}