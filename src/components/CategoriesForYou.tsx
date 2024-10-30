function CategoriesForYou() {
  return (
    <div className="py-12">
      <div className="relative">
        <div className="absolute bg-pink-50 h-full left-[calc(50%-200px)] right-0 rounded-l-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center py-4">
            {' '}
            ... classés par catégories
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto mt-8 px-4">
        <div className="w-64 bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
          <img
            src="/images/couplecycle.png"
            alt="Couple cycling"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Promenade</h3>
          </div>
        </div>

        <div className="w-64 bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
          <img
            src="/images/coupletennis.png"
            alt="Couple Tennis"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Divertissement</h3>
          </div>
        </div>

        <div className="w-64 bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
          <img
            src="/images/coupleyoga.jpeg"
            alt="Couple doing yoga"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Bien-être</h3>
          </div>
        </div>

        <div className="w-64 bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
          <img
            src="/images/couplehands.jpg"
            alt="Holding hands"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Et plus encore ...</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesForYou;
