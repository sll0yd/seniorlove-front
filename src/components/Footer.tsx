function Footer() {
  return (
    <footer className="bg-white p-4 md:p-5">
      {/* Links container */}
      <div className="flex flex-col md:flex-row justify-center md:justify-evenly space-y-4 md:space-y-0 md:space-x-5 py-3 md:py-5 px-4 md:px-10">
        <a 
          href="#" 
          className="text-black text-center hover:text-gray-600 transition-colors duration-200 text-sm md:text-base"
        >
          Conditions Générales
        </a>
        <a 
          href="#" 
          className="text-black text-center hover:text-gray-600 transition-colors duration-200 text-sm md:text-base"
        >
          Règles de Communautés
        </a>
        <a 
          href="#" 
          className="text-black text-center hover:text-gray-600 transition-colors duration-200 text-sm md:text-base"
        >
          Politiques de Confidentialité
        </a>
        <a 
          href="#" 
          className="text-black text-center hover:text-gray-600 transition-colors duration-200 text-sm md:text-base"
        >
          Signaler un Contenu Illégal
        </a>
      </div>

      {/* Copyright section */}
      <div className="border-t border-gray-200">
        <h1 className="text-lg md:text-xl font-semibold text-black text-center py-4 md:py-5">
          © Senior Love{' '}
          <span className="animate-pulse inline-block">💘</span>
        </h1>
      </div>
    </footer>
  );
}

export default Footer;