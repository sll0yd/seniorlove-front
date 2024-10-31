function FooterBanner() {
  return (
    <>
      <div className=" bg-pink-50 h-full left-[calc(50%-200px)] right-0 rounded-l-3xl">
        <div className="flex items-center justify-between px-4 py-9">
          <p className="text-center text-2xl flex-1 italic mr-4 ">
            Commencez dès aujourd'hui à rencontrer des personnes prêtes à
            partager de beaux moments et à construire une relation sincère
          </p>
          <button className="px-8 py-3 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300">
            S'inscrire
          </button>
        </div>
      </div>
    </>
  );
}
export default FooterBanner;
