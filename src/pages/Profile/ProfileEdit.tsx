import { useEffect, useState } from 'react';
import AxiosInstance from '../../utils/axios';
import type { IUser } from '../../@types';
import { useTags } from '../../context/TagContext';

// TODO

function ProfileEdit() {
  const [user, setUser] = useState<IUser | null>(null);
  const { tags } = useTags();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AxiosInstance.get<IUser>('/me');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchProfile();
  }, []);

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
            Mon compte
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          <div className="hidden md:block absolute top-[240px] h-[400px] left-1/2 w-px bg-gray-200 opacity-50" />

          <div className="md:col-span-2 flex justify-center mb-12">
            <div className="w-40 h-40 rounded-lg overflow-hidden">
              <img
                src={
                  user.picture ||
                  'https://randomuser.me/api/portraits/men/1.jpg'
                }
                alt="Profile"
                className="w-64 h-64 object-cover rounded-lg mx-auto"
              />
            </div>
          </div>

          <div className="space-y-6 md:pr-12">
            <h2 className="text-xl font-semibold">
              VOS INFORMATIONS PUBLIQUES
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Nom (ou pseudonyme) :
                </label>
                <input
                  id="username"
                  type="text"
                  value={user.userName}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Localisation :
                </label>
                <input
                  id="location"
                  type="text"
                  value={user.hometown}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Votre bio :
                </label>
                <textarea
                  id="bio"
                  className="w-full p-2 border rounded-md h-32"
                  defaultValue={
                    user.bio ||
                    "J'aime les longues balades sur la plage et les soirées au coin du feu."
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="interests"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Vos centres d'intérêt :
                </label>
                <div id="interests" className="flex flex-wrap gap-2">
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
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:pl-12">
            <h2 className="text-xl font-semibold">VOS INFORMATIONS PRIVÉES</h2>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="current-password"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Mot de passe actuel :
                </label>
                <input
                  id="current-password"
                  type="password"
                  defaultValue="******************"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Nouveau mot de passe :
                </label>
                <input
                  id="new-password"
                  type="password"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <button
                type="button"
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Mettre à jour
              </button>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center mt-12">
            <button
              type="button"
              className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfileEdit;
