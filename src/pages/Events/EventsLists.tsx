import { useEffect, useState } from 'react';
import axios from 'axios';
import type { IEvent } from '../../@types';

function Eventlists() {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<IEvent[]>(
          'http://localhost:3000/api/events',
        );
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <input
              type="text"
              placeholder="Recherche..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Évènements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-lg bg-white shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <img
                    src={event.picture || '/api/placeholder/400/300'}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    {event.title}
                  </h3>
                  <p className="text-center text-gray-800 italic">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eventlists;
