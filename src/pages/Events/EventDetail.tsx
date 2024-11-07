import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { IEvent } from '../../@types';
import AxiosInstance from '../../utils/axios';
import { useTags } from '../../context/TagContext'; // Importer useTags

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<IEvent | null>(null);
  const { tags } = useTags(); // Récupérer les tags depuis le contexte

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await AxiosInstance.get<IEvent>(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Chargement...</div>;
  }

  // Mappage des tags de l'événement pour ajouter la couleur
  const eventTags =
    event.tags?.map((eventTag) => {
      const tag = tags.find((tag) => tag.id === eventTag.id); // Trouver le tag dans le contexte
      return tag ? { ...eventTag, color: tag.color } : null; // Ajouter la couleur si trouvée
    }) || [];

  return (
    <main className="pt-24">
      <div className="relative mb-12">
        <div className="absolute bg-pink-50 h-full w-[300px] left-0 rounded-r-3xl" />
        <div className="relative max-w-[300px]">
          <h1 className="text-2xl font-bold py-4 text-center px-8">
            Détail de l'événement
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto m-8">
        <div>
          <img
            src={event.picture || '/api/placeholder/1200/600'}
            alt={event.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="bg-pink-50 p-6">
          <div className="text-sm text-gray-600 mb-4 text-center">
            Proposé par · H. Burger · Le · {event.date} · À · {event.location}
          </div>

          <div className="flex flex-col items-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              {event.title}
            </h2>
            <div className="mt-2 text-center">
              {eventTags.length > 0 ? (
                eventTags.map((tag) =>
                  tag ? (
                    <span
                      key={tag.id}
                      style={{ backgroundColor: `#${tag.color}` }}
                      className="inline-block text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ) : null,
                )
              ) : (
                <p>Aucun tag associé à cet événement</p>
              )}
            </div>
          </div>

          <blockquote className="text-gray-700 italic text-lg text-center my-8">
            "{event.description}"
          </blockquote>

          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-2 bg-red-400 text-white rounded-full hover:bg-red-500 transition-colors"
            >
              Participer à l'événement
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetail;
