import { useEffect, useState } from "react";
import AxiosInstance from "../../utils/axios";
import type { IUser, ITag } from "../../@types";
import { useTags } from "../../context/TagContext";

function ProfileEdit() {
  // États pour gérer les informations du profil utilisateur
  const [user, setUser] = useState<IUser | null>(null);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [hometown, setHometown] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // États pour gérer les tags (centres d'intérêt)
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [isUpdatingTags, setIsUpdatingTags] = useState(false);
  const { tags } = useTags(); // Récupération de tous les tags disponibles depuis le contexte

  // Récupération des données du profil utilisateur au chargement du composant
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AxiosInstance.get<IUser>("/me");
        const userData = response.data;
        
        // Mise à jour des états avec les données utilisateur
        setUser(userData);
        setUserName(userData.userName || "");
        setAge(userData.age?.toString() || "");
        setHometown(userData.hometown || "");
        setBio(userData.bio || "");
        
        // Traitement des tags de l'utilisateur
        if (userData.tags && Array.isArray(userData.tags)) {
          // Fusion des tags utilisateur avec les informations complètes des tags (notamment les couleurs)
          const formattedTags = userData.tags.map(userTag => {
            const fullTag = tags.find(t => t.id === userTag.id);
            return {
              ...userTag,
              color: fullTag?.color || ''
            };
          });
          
          setSelectedTags(formattedTags);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchProfile();
  }, [tags]);

  // Gestion de la sauvegarde du profil
  const handleSave = async () => {
    try {
      const updatedUser = {
        userName,
        age,
        hometown,
        bio,
        password: newPassword || password,
      };
      await AxiosInstance.patch("/me", updatedUser);
      alert("Informations mises à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Une erreur s'est produite");
    }
  };

  // Ajout d'un nouveau tag au profil
  const handleAddTag = async (tag: ITag) => {
    if (selectedTags.find((t) => t.id === tag.id)) {
      return; // Évite les doublons
    }

    setIsUpdatingTags(true);
    try {
      await AxiosInstance.post(`/me/tags/${tag.id}`);
      setSelectedTags([...selectedTags, tag]);
      setIsTagDropdownOpen(false);
    } catch (error) {
      console.error("Error adding tag:", error);
      alert("Une erreur s'est produite lors de l'ajout du tag");
    } finally {
      setIsUpdatingTags(false);
    }
  };

  // Suppression d'un tag du profil
  const handleRemoveTag = async (tagId: number) => {
    setIsUpdatingTags(true);
    try {
      await AxiosInstance.delete(`/me/tags/${tagId}`);
      setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
    } catch (error) {
      console.error("Error removing tag:", error);
      alert("Une erreur s'est produite lors de la suppression du tag");
    } finally {
      setIsUpdatingTags(false);
    }
  };

  // Affichage d'un message de chargement si les données ne sont pas encore disponibles
  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <main className="pt-24">
      {/* En-tête de la page avec fond bleu */}
      <div className="relative mb-4">
        <div className="absolute bg-blue-50 h-full w-[300px] left-0 rounded-r-3xl" />
        <div className="relative max-w-[300px]">
          <h1 className="text-2xl font-bold py-4 text-center px-8">
            Mon compte
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Ligne verticale de séparation entre les colonnes */}
          <div className="hidden md:block absolute top-[240px] h-[400px] left-1/2 w-px bg-gray-200 opacity-50" />

          {/* Section photo de profil */}
          <div className="md:col-span-2 flex justify-center mb-6">
            <div className="w-40 h-40 rounded-lg overflow-hidden">
              <img
                src={
                  user.picture ||
                  "https://randomuser.me/api/portraits/men/1.jpg"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Colonne gauche - Informations publiques */}
          <div className="space-y-4 md:pr-12">
            <h2 className="text-xl font-semibold">
              VOS INFORMATIONS PUBLIQUES
            </h2>

            <div className="space-y-4">
              {/* Champ Nom */}
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
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Champ Age */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Age :
                </label>
                <input
                  id="age"
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  min="60"
                  max="120"
                />
              </div>

              {/* Champ Localisation */}
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
                  value={hometown}
                  onChange={(e) => setHometown(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Champ Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Votre bio :
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 border rounded-md h-32"
                />
              </div>

              {/* Section des tags (centres d'intérêt) */}
              <div className="relative">
                <label
                  htmlFor="interests"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Vos centres d'intérêt :
                </label>
                <div id="interests" className="flex flex-wrap gap-3">
                  {/* Affichage des tags sélectionnés */}
                  <div className="flex flex-wrap gap-2 items-center">
                    {selectedTags && selectedTags.length > 0 ? (
                      selectedTags.map((tag) => (
                        <span
                          key={tag.id}
                          style={{
                            backgroundColor: `#${tag.color}`
                          }}
                          className="inline-flex items-center justify-center gap-1 text-sm px-3 py-1.5 rounded-full text-white"
                        >
                          <span className="leading-none flex items-center">
                            {tag.name}
                          </span>
                          {/* Bouton de suppression du tag */}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag.id)}
                            disabled={isUpdatingTags}
                            className={`ml-1 rounded-full hover:bg-white/20 transition-colors w-4 h-4 flex items-center justify-center leading-none text-lg ${
                              isUpdatingTags ? "opacity-50 cursor-not-allowed" : ""
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

                  {/* Bouton et menu déroulant pour ajouter des tags */}
                  <div className="relative">
                    <button
                      type="button"
                      className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors ${
                        isUpdatingTags ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                      disabled={isUpdatingTags}
                    >
                      <span className="text-gray-600 text-lg">+</span>
                    </button>
                    {/* Menu déroulant des tags disponibles */}
                    {isTagDropdownOpen && (
                      <div className="absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                        <div className="py-1 max-h-64 overflow-y-auto">
                          {tags.map((tag) => (
                            <button
                              type="button"
                              key={tag.id}
                              className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 group ${
                                isUpdatingTags ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                              onClick={() => handleAddTag(tag)}
                              disabled={isUpdatingTags}
                            >
                              <span
                                className="inline-block w-3 h-3 rounded-full transition-transform group-hover:scale-110"
                                style={{ 
                                  backgroundColor: `#${tag.color}`
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
              </div>
            </div>
          </div>

          {/* Colonne droite - Informations privées */}
          <div className="space-y-4 md:pl-12">
            <h2 className="text-xl font-semibold">VOS INFORMATIONS PRIVÉES</h2>

            <div className="space-y-4">
              {/* Champ mot de passe actuel */}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Champ nouveau mot de passe */}
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
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Bouton de mise à jour du mot de passe */}
              <button
                type="button"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                onClick={handleSave}
              >
                Mettre à jour
              </button>
            </div>
          </div>

          {/* Bouton de sauvegarde global */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="button"
              onClick={handleSave}
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