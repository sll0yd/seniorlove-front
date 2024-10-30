function EventsForYou() {
  return (
    <div className="w-full bg-gray-50 px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">
        Des événements pour vous...
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="h-48 overflow-hidden">
            <img
              src="/images/couplecooking.png"
              alt="Couple Cooking"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <p className="text-center italic text-gray-700 leading-relaxed">
              "Cuisinez, partagez vos astuces et savourez ensemble un délicieux
              repas lors d'un atelier culinaire chaleureux et convivial."
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="h-48 overflow-hidden">
            <img
              src="/images/coupledancing.png"
              alt="Dancing event"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <p className="text-center italic text-gray-700 leading-relaxed">
              "Dansez, riez et laissez-vous emporter par le rythme lors d'une
              soirée conviviale entre amateurs de danse de tout âge."
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="h-48 overflow-hidden">
            <img
              src="/images/couplecinema.png"
              alt="Movie discussion"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <p className="text-center italic text-gray-700 leading-relaxed">
              "Partagez un moment complice autour d'un bon film, suivi d'une
              discussion animée avec des passionnés de votre génération."
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button className="px-8 py-3 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300">
          S'inscrire
        </button>
      </div>
    </div>
  );
}

export default EventsForYou;
