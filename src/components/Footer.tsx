function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
          <a href="/conditions-generales" className="text-gray-600 hover:text-black text-sm transition-colors duration-200">
            Conditions Générales
          </a>
          <a href="/politique-confidentialite" className="text-gray-600 hover:text-black text-sm transition-colors duration-200">
            Politiques de Confidentialité
          </a>
          <a href="/regles-communaute" className="text-gray-600 hover:text-black text-sm transition-colors duration-200">
            Règles de Communautés
          </a>
        </div>
 
        <div className="w-1/2 mx-auto border-t border-gray-200 my-4" />
 
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <span className="text-xl font-semibold">Senior Love</span>
            <span className="ml-2 text-red-500 animate-pulse text-2xl">♥</span>
          </div>
          <p className="text-gray-600 text-sm">
            © {currentYear} Senior Love. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
 }

export default Footer;