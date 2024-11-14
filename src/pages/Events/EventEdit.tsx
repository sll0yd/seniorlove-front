import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../utils/axios';
import type { IEvent } from '../../@types';
import { useTags } from '../../context/TagContext';
import type { ITag } from '../../@types';

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
  // Etats pour gérer l'image
  const [picture, setPicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  // Etat pour gérer les tags
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [isUpdatingTags, setIsUpdatingTags] = useState(false);
  const { tags } = useTags();

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

      // its necessary to map the tags with the color in the context
      if (event.tags && Array.isArray(event.tags)) {
        const formattedTags = event.tags.map((eventTag) => {
          const fullTag = tags.find((t) => t.id === eventTag.id);
          return {
            ...eventTag,
            color: fullTag?.color || '',
          };
        });
        setSelectedTags(formattedTags);
      }
    }
  }, [event, tags]);

  // Update the preview of the picture
  useEffect(() => {
    if (picture) {
      const objectUrl = URL.createObjectURL(picture);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  }, [picture]);

  // Function to handle the picture
  const handlePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPicture(file); // Set the picture state for preview

    const formData = new FormData();
    formData.append('picture', file);

    try {
      const response = await AxiosInstance.post(
        `me/events/${id}/event_picture`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      console.log(response); // Response for the uploaded picture
    } catch (error) {
      console.error('Error uploading picture:', error);
    }
  };

  // Function to update the event only string fields
  const handleEditSubmit = async (e: React.FormEvent) => {
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
      navigate(`/events/${id}`);
    } catch (err) {
      setError(
        "Une erreur est survenue lors de la modification de l'événement.",
      );
    }
  };

  // Function to handle the tag selection to event list
  const handleAddTag = async (tag: ITag) => {
    if (selectedTags.find((t) => t.id === tag.id)) {
      return; // Évite les doublons
    }
    setIsUpdatingTags(true);
    try {
      if (event) {
        await AxiosInstance.post(`/me/events/${event.id}/tags/${tag.id}`);
      }
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
      // Mise à jour du user context avec les nouveaux tags
      if (event) {
        setEvent({
          ...event,
          tags: updatedTags,
        });
      }
      setIsTagDropdownOpen(false);
    } catch (error) {
      console.error('Error adding tag:', error);
      alert("Une erreur s'est produite lors de l'ajout du tag");
    } finally {
      setIsUpdatingTags(false);
    }
  };

  // Function to remove a tag from the event list
  const handleRemoveTag = async (tagId: number) => {
    if (!event || !event.id) {
      return;
    }
    setIsUpdatingTags(true);
    try {
      await AxiosInstance.delete(`/me/events/${event.id}/tags/${tagId}`);
      const updatedTags = selectedTags.filter((tag) => tag.id !== tagId);
      setSelectedTags(updatedTags);
      // Mise à jour du user context avec les tags mis à jour
      if (event) {
        setEvent({
          ...event,
          tags: updatedTags,
        });
      }
    } catch (error) {
      console.error('Error removing tag:', error);
      alert("Une erreur s'est produite lors de la suppression du tag");
    } finally {
      setIsUpdatingTags(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!event || !event.id) {
      return;
    }
    try {
      await AxiosInstance.delete(`/me/events/${event.id}`);
      navigate('/events');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert("Une erreur s'est produite lors de la suppression de l'événement");
    }
  };

  const confirmAndDeleteEvent = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const isConfirmed = window.confirm(
      'Êtes-vous sûr de vouloir supprimer cet événement ?',
    );
    if (isConfirmed) {
      handleDeleteEvent();
    }
  };

  return (
    <main className="pt-24">
      <div className="relative  mb-8">
        <div className="absolute bg-pink-50 h-full w-[400px] left-0 rounded-r-3xl" />
        <div className="relative max-w-[400px]">
          <h1 className="text-2xl font-bold py-4 text-center px-8 whitespace-nowrap">
            Modifier votre évènement
          </h1>
        </div>
      </div>
      <div className="bg-pink-50 rounded-lg p-8">
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-[900px] h-[400px] bg-gray-200 rounded-lg overflow-hidden ">
            <img
              src={preview || event?.picture || '/api/placeholder/1200/600'}
              alt={event?.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <label
          htmlFor="upload-picture"
          className="px-4 py-2 bg-gray-800 text-white rounded-lg mx-auto block cursor-pointer w-96 text-center"
        >
          Choisissez une photo de couverture
        </label>
        <form action="/uploads" method="POST">
          <input
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
            className="hidden"
            id="upload-picture"
          />
        </form>
        <form className="space-y-6" onSubmit={handleEditSubmit}>
          <div>
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Le titre de votre évènement :
            </label>
            <input
              type="text"
              id="title"
              placeholder="Votre titre ici..."
              className="w-full p-2 border rounded-md"
              value={event?.title || ''}
              onChange={(e) =>
                setEvent(
                  (prev) => ({ ...prev, title: e.target.value }) as IEvent,
                )
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-gray-700 mb-2">
                Localisation de l'évènement :
              </label>
              <input
                type="text"
                id="location"
                placeholder="Votre localisation ici..."
                className="w-full p-2 border rounded-md"
                value={event?.location || ''}
                onChange={(e) =>
                  setEvent(
                    (prev) => ({ ...prev, location: e.target.value }) as IEvent,
                  )
                }
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-gray-700 mb-2">
                Date de l'évènement :
              </label>
              <input
                type="text"
                id="date"
                placeholder="22 / 10 /2024"
                className="w-full p-2 border rounded-md"
                value={event?.date || ''}
                onChange={(e) =>
                  setEvent(
                    (prev) => ({ ...prev, date: e.target.value }) as IEvent,
                  )
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Quelques mots sur l'évènement :
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full p-2 border rounded-md"
              placeholder="Description de l'évènement..."
              value={event?.description || ''}
              onChange={(e) =>
                setEvent(
                  (prev) =>
                    ({ ...prev, description: e.target.value }) as IEvent,
                )
              }
            />
          </div>
          <label htmlFor="interests" className="block text-gray-700 mb-2">
            Catégorie de l'évenement :
          </label>
          <div id="interests" className="flex flex-wrap gap-3">
            <div className="flex flex-wrap gap-2 items-center">
              {selectedTags && selectedTags.length > 0 ? (
                selectedTags.map((tag) => (
                  <span
                    key={tag.id}
                    style={{
                      backgroundColor: `#${tag.color}`,
                    }}
                    className="inline-flex items-center justify-center gap-1 text-sm px-3 py-1.5 rounded-full text-white"
                  >
                    <span className="leading-none flex items-center">
                      {tag.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag.id)}
                      disabled={isUpdatingTags}
                      className={`ml-1 rounded-full hover:bg-white/20 transition-colors w-4 h-4 flex items-center justify-center leading-none text-lg ${
                        isUpdatingTags ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      aria-label="Remove tag"
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-gray-500 italic text-sm">
                  Aucun tag associé à ce profil
                </p>
              )}
            </div>
            {/* Menu déroulant des tags */}
            <div className="relative">
              <button
                type="button"
                className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors ${
                  isUpdatingTags ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                disabled={isUpdatingTags}
              >
                <span className="text-gray-600 text-lg">+</span>
              </button>
              {isTagDropdownOpen && (
                <div className="absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                  <div className="py-1 max-h-64 overflow-y-auto">
                    {tags.map((tag) => (
                      <button
                        type="button"
                        key={tag.id}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 group ${
                          isUpdatingTags ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => handleAddTag(tag)}
                        disabled={isUpdatingTags}
                      >
                        <span
                          className="inline-block w-3 h-3 rounded-full transition-transform group-hover:scale-110"
                          style={{
                            backgroundColor: `#${tag.color}`,
                          }}
                        />
                        <span className="text-gray-700">{tag.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="px-8 py-3 bg-red-500 border-2 border-white text-white rounded-lg shadow-md hover:bg-red-500 hover:scale-105 hover:shadow-lg hover:text-white-300 transition-all duration-300 mr-4"
              onClick={(e) => confirmAndDeleteEvent(e)}
            >
              Supprimer l'évènement
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Mettre à jour l'évènement
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>
      <div className="py-12">
        <div className="relative">
          <div className="absolute bg-pink-50 h-full right-[calc(50%-550px)] left-0 rounded-r-3xl" />
          <div className="relative max-w-[950px] mx-auto px-4 flex items-center justify-between">
            <p className="text-center text-sm flex-1 italic mr-4 py-4">
              Modifiez les détails de l'évènement et partagez-les avec la
              communauté pour créer des moments uniques.
            </p>
            <button
              type="button"
              className="px-8 py-3 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300"
              onClick={() => navigate('/events')}
            >
              Retour à la liste des événements
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventEdit;
