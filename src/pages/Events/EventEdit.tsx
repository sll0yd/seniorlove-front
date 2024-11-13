import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../utils/axios';
import type { IEvent } from '../../@types';
import { useTags } from '../../context/TagContext';
import { ITag } from '../../@types';

function EventEdit() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // Etats pour gérer les champs du formulaire
  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [picture, setPicture] = useState<File | null>(null);

  // Etat pour gérer les tags
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [isUpdatingTags, setIsUpdatingTags] = useState(false);
  const { tags } = useTags(); // Récupération de tous les tags disponibles

  // la route pour patch titre,description,location,date  est 'me/events/:iddelevent'
  // la route pour patch les tags est 'me/events/:iddelevent/tags/iddutag'
  // la route pour delete un tag est 'me/events/:iddelevent/tags/iddutag'
  // la route pour la photo est 'me/events/:iddelevent/event_picture'

  // la route pour patch titre,description,location,date  est 'me/events/:iddelevent'
  // la route pour patch les tags est 'me/events/:iddelevent/tags/iddutag'
  // la route pour delete un tag est 'me/events/:iddelevent/tags/iddutag'
  // la route pour la photo est 'me/events/:iddelevent/event_picture'

  // Init of the event with the id
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await AxiosInstance.get<IEvent>(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError("Impossible de charger l'événement");
      }
    };
    fetchEvent();
  }, [id]);

  // Update the form fields with the event data
  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setLocation(event.location || '');
      setDate(event.date || '');
      setDescription(event.description || '');
    }
  }, [event]);

  // Function to update the event
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const event = {
        title,
        location,
        date,
        description,
      };
      const response = await AxiosInstance.patch(`me/events/${id}`, event);
      setEvent(response.data);
    } catch (err) {
      setError(
        "Une erreur est survenue lors de la modification de l'événement.",
      );
    }
  };

  return (
    <main className="pt-24">
      <form className="space-y-6" onSubmit={handleEditSubmit}>
        <div className="mb-8">
          <div className="w-full h-64 bg-gray-200 rounded-lg mb-4">
            <img
              src={event?.picture || '/api/placeholder/1200/600'}
              alt={event?.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg mx-auto block"
          >
            Choisissez une photo de couverture
          </button>
        </div>
        <div>
          <label htmlFor="title">Titre de l'évènement</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location">Lieu</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </main>
  );
}

export default EventEdit;
