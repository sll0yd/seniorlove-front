import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { IEvent } from '../../@types';
import AxiosInstance from '../../utils/axios';
import { useTags } from '../../context/TagContext'; // Importer useTags
import { useUser } from '../../context/UserContext'; // Importer useUserContext

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<IEvent | null>(null);
  const { tags } = useTags(); // Récupérer les tags depuis le contexte
  const { user } = useUser();
  const currentUserId = user?.id;

  // States for checking if the user is participating in the event
  const [isParticipating, setIsParticipating] = useState(false);

  // States for number of participants
  const [participants, setParticipants] = useState(1);

  // use effect to update number of participants in the event
  useEffect(() => {
    if (event) {
      const initialParticipants = event.attendees.length; // initial number of participants
      setParticipants(
        event.creator ? initialParticipants + 1 : initialParticipants,
      ); // if the creator is participating we add 1 to the initial number of participants
    }
  }, [event]);

  // Use effect for checking if the user is participating in the event
  useEffect(() => {
    const checkParticipation = async () => {
      try {
        const response = await AxiosInstance.get<IEvent>(`/events/${id}`);
        setIsParticipating(
          response.data.attendees.some(
            (attendee) => attendee.id === currentUserId,
          ),
        );
        // a partir de la response.data je dois vérifier si mon user est dans les participants de l'event
      } catch (error) {
        console.error('Error checking participation:', error);
      }
    };
    if (event) {
      checkParticipation();
    }
  }, [event, currentUserId, id]);

  //Use effect for checking if the user is the creator of the event
  // useEffect(() => {
  //   if (event) {
  //     console.log('Event details:', event);
  //     // console.log(currentUserId); demander pourquoi il m'affiche 13  systématiquement celui là
  //     console.log('Is user the creator:', event.creator.id === currentUserId); // Remplacez 'currentUserName' par le nom d'utilisateur actuel
  //   }
  // }, [event]);

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

  // useEffect pour update le state

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
            Proposé par {event.creator.userName}
          </div>
          <div className="text-sm text-gray-600 mb-4 text-center">
            Ou : {event.location} · Le · {event.date} · {participants}{' '}
            participants actuellement
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
            {event.creator.id === currentUserId ? ( // if the user is the creator of the event we display the button "Modifier l'événement"
              <Link to={`/event/${event.id}/edit`}>
                <button
                  type="button"
                  className="px-6 py-2 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition-colors"
                >
                  Modifier l'événement
                </button>
              </Link> // if the user is not the creator of the event we display the button "Participer à l'événement"
            ) : (
              <button // if the user is already participating in the event we display the button "Annuler la participation"
                type="button"
                className={`px-6 py-2 ${isParticipating ? 'bg-gray-400' : 'bg-red-400'} text-white rounded-full hover:${isParticipating ? 'bg-red-400' : 'bg-red-500'} transition-colors`}
                onClick={async () => {
                  // logical condition to check if the user is participating in the event we set
                  try {
                    if (isParticipating) {
                      await AxiosInstance.delete(`/me/events/join/${event.id}`);
                      setIsParticipating(false);
                      setParticipants(participants - 1);
                    } else {
                      await AxiosInstance.post(`/me/events/join/${event.id}`);
                      setIsParticipating(true);
                      setParticipants(participants + 1);
                    }
                  } catch (error) {
                    console.error('Error updating participation:', error);
                  }
                }}
              >
                {isParticipating
                  ? 'Annuler la participation'
                  : "Participer à l'événement"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="py-12">
        ·
        <div className="relative">
          <div className="absolute bg-pink-50 h-full right-[calc(50%-550px)] left-0 rounded-r-3xl" />
          <div className="relative max-w-[950px] mx-auto px-4 flex items-center justify-between p-6">
            <p className="text-center text-lg flex-1 italic mr-4 py-4 ">
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
