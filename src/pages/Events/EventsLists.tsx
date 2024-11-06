import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import type { IEvent } from '../../@types';
import AxiosInstance from "../../utils/axios";

function Eventlists() {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await AxiosInstance.get<IEvent[]>('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="pt-24">
      {/* Title with pink background */}
      <div className="relative mb-12">
        <div className="absolute bg-pink-50 h-full w-[300px] left-0 rounded-r-3xl" />
        <div className="relative max-w-[300px]">
          <h1 className="text-2xl font-bold py-4 text-center px-8">
            Évènements
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12">
          <input
            type="text"
            placeholder="Recherche d'un évenement..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="rounded-lg bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Eventlists;