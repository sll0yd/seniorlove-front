import { useEffect, useState } from 'react';
import { Profile } from '../@types'; // Assurez-vous que le type Profile est correctement défini

interface ProfileProps {
  profile: Profile;
}

function ProfilesLists() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    // public file so don't need to put all the path
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du fichier JSON');
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.users)) {
          console.log(data.users);
          setProfiles(data.users);
        } else {
          console.error(
            "Les données JSON ne contiennent pas un tableau d'utilisateurs",
          );
        }
      })
      .catch((error) =>
        console.error('Erreur lors du chargement des profils :', error),
      );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Recherchez des profils..."
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="text-lg font-medium mb-4">Liste des profils</div>

        <div className="space-y-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-blue-50 rounded-lg shadow-sm p-4 flex justify-between items-start"
            >
              <div className="flex gap-4">
                <img
                  src={
                    profile.avatar ||
                    'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
                  }
                  alt="Avatar"
                  className="w-16 h-16 object-cover flex-shrink-0"
                />
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {profile.userName}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {profile.age} ans, habite {profile.hometown}
                  </div>
                  <div className="text-sm">{profile.bio}</div>
                </div>
              </div>
              <button
                type="button"
                className="bg-white text-pink-500 px-4 py-1 rounded border border-pink-500 text-sm hover:bg-pink-50 whitespace-nowrap"
              >
                Voir le Profil
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilesLists;
