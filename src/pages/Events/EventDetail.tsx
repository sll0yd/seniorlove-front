import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
            Proposé par · {event.creator.userName} · Le · {event.date} · À ·{' '}
            {event.location}
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
      <div className="py-12">
        <div className="relative">
          <div className="absolute bg-pink-50 h-full right-[calc(50%-550px)] left-0 rounded-r-3xl" />
          <div className="relative max-w-[950px] mx-auto px-4 flex items-center justify-between">
            <p className="text-center text-sm flex-1 italic mr-4 py-4">
              Ne manquez pas cette occasion de rejoindre un événement convivial
              et de rencontrer des personnes prêtes à partager des moments
              authentiques !
            </p>
            <Link to="/events">
              <button
                type="button"
                className="px-8 py-3 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300"
              >
                Retour à la liste des évènements
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetail;
