import { useEffect, useState } from 'react';
import type { IUser } from '../../@types';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../utils/axios';
import { useTags } from '../../context/TagContext';

function ProfileDetail() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<IUser | null>(null);
  const { tags } = useTags();

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

  return (
    <main className="pt-24">
      <div className="relative mb-12">
        <div className="absolute bg-blue-50 h-full w-[300px] left-0 rounded-r-3xl" />
        <div className="relative max-w-[300px]">
          <h1 className="text-2xl font-bold py-4 text-center px-8">
            Son profil
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8">
        {' '}
        <div className="bg-blue-50 rounded-lg p-12">
          {' '}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {' '}
            <div className="md:col-span-1">
              <img
                src={
                  user.picture ||
                  'https://randomuser.me/api/portraits/men/1.jpg'
                }
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
                          className="inline-block text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full"
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
                  className="px-8 py-2 text-red-400 border border-red-400 rounded-full hover:bg-red-50"
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

              <p className="text-gray-700 text-lg leading-relaxed italic">
                "
                {user.bio ||
                  "Grand(e) romantique à la recherche de la personne qui fera battre mon cœur. J'aime les balades au bord de l'eau, les couchers de soleil, et les longues discussions qui s'étirent jusqu'au petit matin. Ici pour construire quelque chose de vrai et durable."}
                "
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfileDetail;
