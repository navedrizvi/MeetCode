using System.Threading;
using MediatR;
using Persistence;
using System;
using System.Threading.Tasks;
using Domain;

namespace Application.Meetings
{
    public class Edit
    {
        public class Command : IRequest //properties user can edit along withn id's 
        {
            public Guid Id { get; set; } //user cant edit
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
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
                    throw new Exception("Could not find meeting");

                //now user can update single or many fields
                meeting.Title = request.Title ?? meeting.Title;
                meeting.Description = request.Description ?? meeting.Description;
                meeting.Category = request.Category ?? meeting.Category;
                meeting.Date = request.Date ?? meeting.Date;
                meeting.City = request.City ?? meeting.City;
                meeting.Venue = request.Venue ?? meeting.Venue;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}