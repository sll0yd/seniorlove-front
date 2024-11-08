import FooterBanner from '../../components/FooterBanner';

function EventCreate() {
  return (
    <main className="pt-24">
      <div className="relative mb-12">
        <div className="absolute bg-pink-50 h-full w-[400px] left-0 rounded-r-3xl" />
        <div className="relative max-w-[400px]">
          <h1 className="text-2xl font-bold py-4 text-center px-8 whitespace-nowrap">
            Créez votre évènement
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="bg-pink-50 rounded-lg p-8">
          <div className="mb-8">
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-4">
              <div className="w-full h-full flex items-center justify-center"></div>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg mx-auto block"
            >
              Choisissez une photo de couverture
            </button>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="event-name" className="block text-gray-700 mb-2">
                Le nom de votre évènement :
              </label>
              <input
                type="text"
                id="event-name"
                placeholder="Soirée Salsa"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-gray-700 mb-2">
                  Localisation de l'évènement :
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Paris"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-gray-700 mb-2">
                  Date de l'évènement :
                </label>
                <input
                  type="text"
                  id="date"
                  placeholder="22 / 10 /2024"
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 mb-2">
                Quelques mots sur l'évènement :
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full p-2 border rounded-md"
                placeholder="Dansez, riez et laissez-vous emporter par le rythme lors d'une soirée conviviale entre amteurs de dans de tout âge."
              />
            </div>

            <div>
              <label htmlFor="categories" className="block text-gray-700 mb-2">
                Catégories de l'évènement :
              </label>
              <select
                id="categories"
                className="w-full p-2 border rounded-md bg-white"
                defaultValue=""
              >
                <option value="" disabled>
                  Value
                </option>
                <option value="danse">Danse</option>
                <option value="rencontre">Rencontre</option>
                <option value="sport">Sport</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Publier l'évènement
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="py-12">
        <div className="relative">
          <div className="absolute bg-pink-50 h-full right-[calc(50%-550px)] left-0 rounded-r-3xl" />
          <div className="relative max-w-[950px] mx-auto px-4 flex items-center justify-between">
            <p className="text-center text-sm flex-1 italic mr-4 py-4">
              Ne manquez pas cette occasion de créer un événement convivial et
              de rencontrer des personnes prêtes à partager des moments
              authentiques !
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventCreate;
