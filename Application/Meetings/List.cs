using System;
using System.Threading;
using MediatR;
using Domain;
using System.Collections.Generic;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Application.Meetings
{
    public class List
    {
        public class Query : IRequest<List<Meeting>> { }

        public class Handler : IRequestHandler<Query, List<Meeting>>
        {
            private readonly DataContext _context;
            private readonly ILogger _logger;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Meeting>> Handle(Query request, CancellationToken cancellationToken)
            {
                var meetings = await _context.Meetings.ToListAsync();

                return meetings;
            }
        }
    }
}