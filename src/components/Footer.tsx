import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <Link 
            to="/terms" 
            className="text-gray-600 hover:text-black text-sm transition-colors duration-200"
            onClick={scrollToTop}
          >
            Conditions Générales
          </Link>
          <Link 
            to="/privacy" 
            className="text-gray-600 hover:text-black text-sm transition-colors duration-200"
            onClick={scrollToTop}
          >
            Politique de Confidentialité
          </Link>
          <Link 
            to="/community" 
            className="text-gray-600 hover:text-black text-sm transition-colors duration-200"
            onClick={scrollToTop}
          >
            Règles de Communauté
          </Link>
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