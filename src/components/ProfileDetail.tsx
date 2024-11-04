const ProfileDetail = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-lg text-blue-600 mb-4">Mon profil</h1>

      <div className="bg-blue-50 rounded-lg p-8">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-2/5">
            <div className="rounded-lg overflow-hidden w-64 h-64 mx-auto md:mx-0">
              <img
                src="/api/placeholder/300/300"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-3 mt-6 justify-center md:justify-start">
              <span className="px-4 py-1.5 bg-purple-600 text-white text-sm rounded-full">
                Danse
              </span>
              <span className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-full">
                Rencontre
              </span>
              <span className="px-4 py-1.5 bg-gray-600 text-white text-sm rounded-full">
                Sport
              </span>
            </div>

            <button
              type="button"
              className="mt-6 px-6 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-colors w-full md:w-auto"
            >
              Lui Écrire
            </button>
          </div>

          <div className="w-full md:w-3/5">
            <h2 className="text-2xl font-medium mb-2">Nom, prénom (pseudo)</h2>
            <p className="text-gray-600 text-sm mb-6">Age, Localisation</p>

            <h3 className="font-medium text-lg mb-3">Rêveur romantique</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              "Grand(e) romantique à la recherche de la personne qui fera battre
              mon cœur. J'aime les balades au bord de l'eau, les couchers de
              soleil, et les longues discussions qui s'étirent jusqu'au petit
              matin. Ici pour construire quelque chose de vrai et durable."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
