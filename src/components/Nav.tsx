import { useState } from 'react';
import FormLogin from './FormLogin';
import AxiosInstance from '../utils/axios'; // Import Axios

function Nav() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const handleOpenForm = (): void => {
    setIsFormOpen(true); // open the form
  };

  const handleCloseForm = (): void => {
    setIsFormOpen(false); // close the form
  };

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen); // Open and  close burger menu
  };

  // Fonction pour la déconnexion
  const handleLogout = (): void => {
    setUserName(''); // Put the username to empty
    AxiosInstance.defaults.headers.common.Authorization = undefined; // Delete the token JWT
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex justify-evenly items-center bg-white shadow-lg w-full pt-3 pl-6 pr-16 pb-3">
      <a className="max-h-8" href="/">
        <img
          src={isMenuOpen ? '/icon/heart.png' : '/icon/copie_logo.png'}
          alt="logo"
          className="flex-col max-h-11 items-center pb-3"
        />
      </a>

      <button
        type="button"
        className="flex text-gray-700 md:hidden absolute top-4 right-6 items-center"
        onClick={toggleMenu}
      >
        <div className="space-y-1 space h-5 pt-1">
          <span
            className={`h-1 block w-7 bg-gray-700 rounded-xl transform transition duration-200 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`h-1 block w-7 bg-gray-700 rounded-xl transition duration-200 ${isMenuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-1 block w-7 bg-gray-700 rounded-xl transform transition duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </div>
      </button>

      <ul
        className={`flex-col space-y-4 md:mt-0 md:space-y-0 md:flex-row md:space-x-20 ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}
      >
        <li>
          <a href="/" className="text-gray-700 hover:text-gray-900">
            Qui sommes-nous ?
          </a>
        </li>
        <li>
          <a href="/" className="text-gray-700 hover:text-gray-900">
            Évènements
          </a>
        </li>
        <li>
          <a href="/" className="text-gray-700 hover:text-gray-900">
            Témoignages
          </a>
        </li>
      </ul>

      <div
        className={`flex-col space-y-4 ${isMenuOpen ? 'flex' : 'hidden'} md:hidden`}
      >
        {userName ? ( // If the user is connected we display the buttons "Mon compte" and "Se déconnecter"
          <>
            <button
              type="button"
              className="p-1 border-2 shadow-lg rounded-lg bg-white border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-colors duration-300"
            >
              Mon compte
            </button>
            <button
              type="button"
              className="p-1 border-2 shadow-lg rounded-lg bg-white border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors duration-300"
              onClick={handleLogout}
            >
              Se déconnecter
            </button>
          </> // If the user is not connected we display the buttons "Se connecter" and "S'inscrire"
        ) : (
          <>
            <button
              type="button"
              className="p-1 border-2 shadow-lg rounded-lg bg-white border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-colors duration-300"
              onClick={handleOpenForm}
            >
              Se connecter
            </button>
            <button
              type="button"
              className="p-1 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300"
            >
              S'inscrire
            </button>
          </>
        )}
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {userName ? (
          <>
            <button
              type="button"
              className="p-1 border-2 shadow-lg rounded-lg bg-white border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-colors duration-300"
            >
              Mon compte
            </button>
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
            <button
              type="button"
              className="p-1 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300"
            >
              S'inscrire
            </button>
          </>
        )}
      </div>

      {isFormOpen && (
        <div className="absolute top-20 right-10 w-80 bg-white shadow-xl rounded-lg p-4 z-10">
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
