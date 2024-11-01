function FooterBanner() {
  return (
    <div className="py-12">
      <div className="relative">
        <div className="absolute bg-pink-50 h-full right-[calc(50%-550px)] left-0 rounded-r-3xl" />
        <div className="relative max-w-[950px] mx-auto px-4 flex items-center justify-between">
          <p className="text-center text-sm flex-1 italic mr-4 py-4">
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
