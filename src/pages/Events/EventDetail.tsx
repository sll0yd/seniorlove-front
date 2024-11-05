const EventDetail = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-pink-50 rounded-lg">
      <div className="space-y-6">
        <h1 className="text-lg font-semibold text-gray-900">
          Détail d'un événement
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h2 className="font-semibold text-gray-900">
                Nom, prénom (pseudo)
              </h2>
              <p className="text-sm text-gray-600">Age, Localisation</p>
            </div>

            <div className="rounded-lg overflow-hidden">
              <img
                src="/api/placeholder/400/400"
                alt="Couple dancing salsa"
                className="w-full object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Soirée Salsa
              </h2>

              <div className="flex gap-2">
                <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">
                  Rencontre
                </span>
                <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                  Danse
                </span>
              </div>

              <blockquote className="text-gray-700 italic text-center px-4">
                "Dansez, riez et laissez-vous emporter par le rythme lors d'une
                soirée conviviale entre amateurs de danse de tout âge."
              </blockquote>

              <button
                type="button"
                className="w-full py-2 px-4 bg-white text-pink-500 border border-pink-500 rounded-full hover:bg-pink-50 transition-colors"
              >
                Participer à l'événement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
