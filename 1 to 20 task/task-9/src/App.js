import React from 'react';

const App = () => {
  const events = [
    { name: 'Event 1', date: '2022-10-20', location: 'New York' },
    { name: 'Event 2', date: '2023-02-10', location: 'Paris' },
    { name: 'Event 3', date: '2023-01-01', location: 'Tokyo' },
  ];

  const sortEventsByDate = (eventsArray) => {
    if (eventsArray.length === 0) return [];
    eventsArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    return eventsArray;
  };

  const sortedEvents = sortEventsByDate(events);

  return (
    <div>
      <h1>Sorted Events</h1>
      <ul>
        {sortedEvents.map((event, index) => (
          <li key={index}>
            {event.name} - {event.date} - {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
