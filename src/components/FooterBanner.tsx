function FooterBanner() {
  return (
    <div className="py-12 w-full">
      <div className="relative">
        <div className="absolute bg-pink-50 h-full md:right-[calc(50%-500px)] right-[calc(50%-200px)] left-0 rounded-r-3xl" />
        <div className="relative max-w-[950px] mx-auto px-4 flex items-center justify-between p-6">
          <p className="text-center text-lg flex-1 italic mr-4 py-3">
            Commencez dès aujourd'hui à rencontrer des personnes prêtes à
            partager de beaux moments et à construire une relation sincère
          </p>
          <button
            type="button"
            className="px-8 py-3 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}

export default FooterBanner;
