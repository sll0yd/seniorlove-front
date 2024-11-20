import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const FooterBanner = () => {
  const { user } = useUser();

  const buttonText = user ? "Trouver des profils" : "S'inscrire";
  const buttonLink = user ? "/profile" : "/"; // Adjust these routes as needed

  return (
    <div className="py-8 md:py-12 w-full">
      <div className="relative">
        <div className="absolute bg-pink-50 h-full md:right-[calc(50%-500px)] right-0 left-0 rounded-r-3xl" />
        <div className="relative max-w-[950px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between p-4 md:p-6 gap-6 md:gap-8">
          <p className="text-center md:text-left text-base md:text-lg flex-1 italic md:mr-4">
            Commencez dès aujourd'hui à rencontrer des personnes prêtes à
            partager de beaux moments et à construire une relation sincère
          </p>
          <Link 
            to={buttonLink} 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <button
              type="button"
              className="w-full md:w-auto px-6 md:px-8 py-3 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300 whitespace-nowrap"
            >
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;