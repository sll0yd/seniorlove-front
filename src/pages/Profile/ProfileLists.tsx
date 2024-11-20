import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { IUser } from '../../@types';
import AxiosInstance from '../../utils/axios';
import Fuse from 'fuse.js';

function ProfilesLists() {
  const [profiles, setProfiles] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState<IUser[]>([]);
  const [genderFilter, setGenderFilter] = useState<'all' | 'F' | 'M'>('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AxiosInstance.get<IUser[]>('/users');
        setProfiles(response.data);
        setFilteredProfiles(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const genderFiltered =
      genderFilter === 'all'
        ? profiles
        : profiles.filter((profile) => profile.gender === genderFilter);

    const fuse = new Fuse(genderFiltered, {
      keys: [
        'userName',
        'bio',
        'hometown',
        {
          name: 'age',
          weight: 0.5,
        },
      ],
      threshold: 0.3,
    });

    if (searchQuery.trim()) {
      const results = fuse.search(searchQuery).map((result) => result.item);
      setFilteredProfiles(results);
    } else {
      setFilteredProfiles(genderFiltered);
    }
  }, [searchQuery, profiles, genderFilter]);

  const getDefaultProfilePicture = (gender: string) => {
    return gender === 'F'
      ? 'https://avatar.iran.liara.run/public/52'
      : 'https://avatar.iran.liara.run/public/45';
  };

  const getBackgroundColor = (gender: string) => {
    return gender === 'F' ? 'bg-pink-50' : 'bg-blue-50';
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="relative mb-12">
        <div className="absolute bg-blue-50 h-full w-[300px] left-0 rounded-r-3xl" />
        <div className="relative max-w-[300px]">
          <h1 className="text-2xl font-bold py-4 text-center px-8">
            Liste des profils
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Recherchez des profils..."
            className="flex-1 p-3 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
          />
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Filtre:</span>
            <select
              value={genderFilter}
              onChange={(e) =>
                setGenderFilter(e.target.value as 'all' | 'F' | 'M')
              }
              className="p-3 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
            >
              <option value="all">Tous</option>
              <option value="F">Femmes</option>
              <option value="M">Hommes</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className={`${getBackgroundColor(profile.gender)} rounded-2xl overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div className="relative">
                <img
                  src={
                    profile.picture || getDefaultProfilePicture(profile.gender)
                  }
                  alt="Avatar"
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="p-4">
                  <div className="text-xl font-semibold">
                    {profile.userName}
                  </div>
                  <div className="text-gray-600">
                    {profile.age} ans, {profile.hometown}
                  </div>
                  <p className="text-gray-700 line-clamp-3 mt-2">
                    {profile.bio}
                  </p>
                  <Link
                    to={`/profile/${profile.id}`}
                    className="block mt-4 text-center px-6 py-2 bg-white border-2 border-rose-400 text-rose-400 rounded-full text-sm hover:bg-rose-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
                  >
                    Voir le Profil
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-12">
        <div className="relative">
          <div className="absolute bg-pink-50 h-full md:right-[calc(50%-500px)] right-[calc(50%-200px)] left-0 rounded-r-3xl" />
          <div className="relative max-w-[950px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between p-6">
            <p className="text-center text-lg flex-1 italic mr-4 py-3">
              Élargissez votre cercle et partez à la rencontre de nouvelles
              personnes prêtes à vivre des expériences enrichissantes !
            </p>
            <Link to="/events" className="mt-4 md:mt-0">
              <button
                type="button"
                className="px-8 py-3 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                Retour à la liste des évènements
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilesLists;
