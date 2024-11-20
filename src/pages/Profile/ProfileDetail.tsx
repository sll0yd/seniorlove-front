import { useEffect, useState } from 'react';
import type { IUser } from '../../@types';
import { Link, useParams } from 'react-router-dom';
import AxiosInstance from '../../utils/axios';
import { useTags } from '../../context/TagContext';

function ProfileDetail() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<IUser | null>(null);
  const { tags } = useTags();
  // Définir la modale de chat comme ouverte ou fermée
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [msgContent, setMsgContent] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AxiosInstance.get<IUser>(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Chargement...</div>;
  }

  const userTags =
    user.tags?.map(
      (userTag) => tags.find((tag) => tag.id === userTag.id), // Trouver les tags correspondant à ceux de l'utilisateur
    ) || [];

  const getDefaultProfilePicture = (gender: string) => {
    if (gender === 'F') {
      return 'https://avatar.iran.liara.run/public/52';
    }
    return 'https://avatar.iran.liara.run/public/45';
  };

  const getBackgroundColor = (gender: string) => {
    return gender === 'F' ? 'bg-pink-50' : 'bg-blue-50';
  };

  // Ouvrir une modale de chat au clique sur le bouton "Lui Écrire"
  const openChatModal = () => {
    setIsChatModalOpen(true);
  };

  // Fermer la modale de chat
  const closeChatModal = () => {
    setIsChatModalOpen(false);
  };

  // Logique pour envoyer un message par le bakc via la route /messages/:receiver_id
  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await AxiosInstance.post(`/me/messages/${user.id}`, {
        content: msgContent,
      });
      alert('Message envoyé avec succès !');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsgContent(event.target.value);
  };

  return (
    <main className="pt-24">
      <div className="relative mb-12">
        {/* // en responsive la modal de chat s'affiche en plein écran */}
        {isChatModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto sm:w-96">
              <h2 className="text-xl font-semibold mb-4">Envoyer un message</h2>
              <form onSubmit={sendMessage}>
                <textarea
                  className="w-full p-2 border rounded-md mb-4"
                  rows={4}
                  placeholder="Écrivez votre message ici..."
                  onChange={handleChange}
                  value={msgContent}
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeChatModal}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="absolute bg-blue-50 h-full w-[300px] left-0 rounded-r-3xl" />
        <div className="relative max-w-[300px]">
          <h1 className="text-2xl font-bold py-4 text-center px-8 md: my-6">
            Son profil
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8">
        {' '}
        <div className={`${getBackgroundColor(user.gender)} rounded-lg p-12`}>
          {' '}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {' '}
            <div className="md:col-span-1">
              <img
                src={user.picture || getDefaultProfilePicture(user.gender)}
                alt="Profile"
                className="w-64 h-64 object-cover rounded-lg mx-auto"
              />
              <div className="mt-2 text-center">
                {userTags && userTags.length > 0 ? (
                  userTags.map(
                    (tag) =>
                      tag?.id && tag?.name && tag?.color ? ( // Utilisation de l'opérateur de chaîne optionnelle
                        <span
                          key={tag.id}
                          style={{ backgroundColor: `#${tag.color}` }}
                          className="inline-block text-white text-sm font-semibold mr-2 px-4 py-1.5 rounded-full"
                        >
                          {tag.name}
                        </span>
                      ) : null, // Si le tag n'a pas toutes les propriétés nécessaires, il n'est pas affiché
                  )
                ) : (
                  <p>Aucun tag associé à ce profil</p>
                )}
              </div>
              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="inline-block px-8 py-2 text-red-400 border border-red-400 rounded-full hover:bg-red-50"
                  onClick={openChatModal}
                >
                  Lui Écrire
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-2">{user.userName}</h2>
              <p className="text-gray-600 mb-8">
                {user.age} ans, {user.hometown}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed ">
                <p className="mb-4">A propos de : </p>"
                {user.bio ? user.bio : "Aucune bio n'a été trouvé."}"
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12">
        <div className="relative">
          <div className="absolute bg-blue-50 h-full right-[calc(50%-500px)] left-0 rounded-r-3xl max-sm:right-[calc(50%-200px)]" />
          <div className="relative max-w-[950px] mx-auto px-4 flex flex-col items-center justify-between md:flex-row">
            <p className="text-center text-sm flex-1 italic mr-4 py-4">
              Commencez dès aujourd'hui à rencontrer des personnes prêtes à
              partager de beaux moments et à construire une relation sincère
            </p>
            <Link to="/profile" className="mt-4 md:mt-0">
              <button
                type="button"
                className="px-8 py-3 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300 max-sm:mb-4"
              >
                Retourner à la liste des profils
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfileDetail;
