import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormLogin from './FormLogin';
import { useUser } from '../context/UserContext';

function Nav() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const { user, logout, authErrorMsg, setAuthErrorMsg } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) setIsFormOpen(false);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsFormOpen(false);
        setAuthErrorMsg(null);
      }
    };

    if (isFormOpen || authErrorMsg) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormOpen, authErrorMsg, setAuthErrorMsg]);

  const handleOpenForm = (): void => {
    if (!user) {
      setIsFormOpen(true);
    }
  };

  const handleCloseForm = (): void => {
    setAuthErrorMsg(null);
    setIsFormOpen(false);
  };

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = (): void => {
    setUserName('');
    logout();
    setIsMenuOpen(false);
    setIsFormOpen(false); // Ferme la modale de connexion
  };

  const handleNavigation = (section: string): void => {
    setIsMenuOpen(false); // Ferme le menu mobile s’il est ouvert

    if (location.pathname === '/') {
      window.dispatchEvent(
        new CustomEvent('scrollToSection', { detail: section }),
      );
    } else {
      navigate('/', { state: { scrollTo: section } });
    }
  };

  return (
    <nav className="fixed z-50 flex justify-evenly items-center bg-white shadow-lg w-full pt-4 pl-6 pr-16 pb-4">
      <Link
        className="max-h-8"
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img
          src={isMenuOpen ? '/icon/heart.png' : '/icon/copie_logo.png'}
          alt="logo"
          className="flex-col max-h-11 items-center pb-3"
        />
      </Link>

      <button
        type="button"
        className="flex text-gray-700 md:hidden absolute top-4 right-6 items-center"
        onClick={toggleMenu}
      >
        <div className="space-y-1 space h-5 pt-1">
          <span
            className={`h-1 block w-7 bg-gray-700 rounded-xl transform transition duration-200 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`h-1 block w-7 bg-gray-700 rounded-xl transition duration-200 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-1 block w-7 bg-gray-700 rounded-xl transform transition duration-200 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      <ul
        className={`flex-col space-y-4 md:mt-0 md:space-y-0 md:flex-row md:space-x-20 ${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex`}
      >
        {user ? (
          <>
            <li>
              <Link to="/profile" className="text-gray-700 hover:text-gray-900 font-bold">
                Trouver des profils
              </Link>
            </li>
            <li>
              <Link to="/events" className="text-gray-700 hover:text-gray-900 font-bold">
                Évènements
              </Link>
            </li>
            <li>
              <Link
                to="/messages"
                className="text-gray-700 hover:text-gray-900 font-bold"
              >
                Messagerie
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                type="button"
                onClick={() => handleNavigation('DiscoverSeniorLove')}
                className="text-gray-700 hover:text-gray-900 font-bold"
              >
                Qui sommes-nous ?
              </button>
            </li>
            <li>
              <Link to="/events" className="text-gray-700 hover:text-gray-900 font-bold">
                Évènements
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavigation('Testimony')}
                className="text-gray-700 hover:text-gray-900 font-bold"
              >
                Témoignages
              </button>
            </li>
          </>
        )}
      </ul>

      <div
        className={`flex-col space-y-4 ${
          isMenuOpen ? 'flex' : 'hidden'
        } md:hidden`}
      >
        {user ? (
          <>
            <Link to="/account">
              <button
                type="button"
                className="p-1 border-2 shadow-lg rounded-lg bg-white border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-colors duration-300"
              >
                Mon compte
              </button>
            </Link>
            <button
              type="button"
              className="p-1 border-2 shadow-lg rounded-lg bg-white border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors duration-300"
              onClick={handleLogout}
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="p-1 border-2 shadow-lg rounded-lg bg-white border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-colors duration-300"
              onClick={handleOpenForm}
            >
              Se connecter
            </button>
            <Link to="/register">
              <button
                type="button"
                className="p-1 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300"
              >
                S'inscrire
              </button>
            </Link>
          </>
        )}
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/account">
              <button
                type="button"
                className="p-1 border-2 shadow-lg rounded-lg bg-white border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-colors duration-300"
              >
                Mon compte
              </button>
            </Link>
            <button
              type="button"
              className="p-1 border-2 shadow-lg rounded-lg bg-white border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors duration-300"
              onClick={handleLogout}
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="p-1 border-2 shadow-lg rounded-lg bg-white border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-colors duration-300"
              onClick={handleOpenForm}
            >
              Se connecter
            </button>
            <Link to="/register">
              <button
                type="button"
                className="p-1 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300"
              >
                S'inscrire
              </button>
            </Link>
          </>
        )}
      </div>

      {(isFormOpen || authErrorMsg) && !user && (
        <div
          ref={modalRef}
          className="absolute top-20 right-10 w-80 bg-white shadow-xl rounded-lg p-4 z-10"
        >
          <FormLogin
            userName={userName}
            setUserName={setUserName}
            onClose={handleCloseForm}
          />
        </div>
      )}
    </nav>
  );
}

export default Nav;
