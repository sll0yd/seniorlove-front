function Eventlists() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <input
              type="text"
              placeholder="Recherche..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Évènements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-lg bg-white shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src="/api/placeholder/400/300"
                  alt="Atelier culinaire"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-center text-gray-800 italic">
                  "Cuisinez, partagez vos astuces et savourez ensemble un
                  délicieux repas lors d'un atelier culinaire chaleureux et
                  convivial."
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-white shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src="/api/placeholder/400/300"
                  alt="Soirée danse"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-center text-gray-800 italic">
                  "Dansez, riez et laissez-vous emporter par le rythme lors
                  d'une soirée conviviale entre amateurs de danse de tout âge."
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-white shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src="/api/placeholder/400/300"
                  alt="Soirée cinéma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-center text-gray-800 italic">
                  "Partagez un moment complice autour d'un bon film, suivi d'une
                  discussion animée avec des passionnés de votre génération."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eventlists;
