import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { IEvent } from '../../@types';
import AxiosInstance from '../../utils/axios';
import Fuse from 'fuse.js';

function Eventlists() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await AxiosInstance.get<IEvent[]>('/events');
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Configure Fuse.js for fuzzy search on title and description fields
    const fuse = new Fuse(events, {
      keys: [{name: 'title', weight: 0.7 }, { name : 'description', weight: 0.4 }, { name: 'tags.name', weight: 0.3 }],
      threshold: 0.3, // Adjust for sensitivity
    });

    if (searchQuery.trim()) {
      const results = fuse.search(searchQuery).map((result) => result.item);
      setFilteredEvents(results);
    } else {
      setFilteredEvents(events); // Show all if no search query
    }
  }, [searchQuery, events]);

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Recherche d'un évènement..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="rounded-lg bg-white shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-64">
                <img
                  src={event.picture || '/api/placeholder/400/300'}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl bg-blue-100 rounded-xl py-2 font-semibold text-gray-800 text-center">
                  {event.title}
                </h3>
                <div className="flex justify-center gap-2">
                {event.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    style={{ backgroundColor: `#${tag.color}` }}
                    className="inline-block text-sm font-semibold text-white rounded-full px-2 py-0.5 mt-2"
                  >
                    {tag.name}
                  </span>
                ))}
                </div>
                <p className="text-center text-sm py-3 text-gray-800">Proposé par : {event.creator.userName} à {event.location}</p>
                <span className="block text-center font-bold">Description de l'évènement:</span>
                <p className="text-center text-gray-800">
                  {event.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="py-12">
        <div className="relative">
          <div className="absolute bg-pink-50 h-full right-[calc(50%-550px)] left-0 rounded-r-3xl" />
          <div className="relative max-w-[950px] mx-auto px-4 flex items-center justify-between p-6">
            <p className="text-center text-lg flex-1 italic mr-4 py-3">
              Créez des événements et partagez-les avec la communauté,
              rencontrer de nouvelle connaissances prêtes à partager dees
              moments uniques.
            </p>
            <Link to="/event/create">
              <button
                type="button"
                className="px-8 py-3 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300"
              >
                Creer un evenement
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Eventlists;
