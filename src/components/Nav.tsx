import { useState } from 'react';
import FormLogin from './FormLogin';
import { Link } from 'react-router-dom';

function Nav() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const handleOpenForm = (): void => {
    setIsFormOpen(true); // Ouvre le formulaire
  };

  const handleCloseForm = (): void => {
    setIsFormOpen(false); // Ferme le formulaire
  };

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen); // Ouvre ou ferme le menu burger
  };

  return (
    <nav className="fixed z-50 flex justify-evenly items-center bg-white shadow-lg w-full pt-3 pl-6 pr-16 pb-3">
      {/* Logo dynamique, taille adaptative */}
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

      {/* Bouton Burger / Croix (position fixe en haut à droite) */}
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

      {/* Menu principal (horizontal en desktop, burger en mobile) */}
      <ul
        className={`flex-col space-y-4 md:mt-0 md:space-y-0 md:flex-row md:space-x-20 ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}
      >
        <li>
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Qui sommes-nous ?
          </Link>
        </li>
        <li>
          <Link
            to="/events"
            className="text-gray-700 hover:text-gray-900 object-center"
          >
            Évènements
          </Link>
        </li>
        <li>
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Témoignages
          </Link>
        </li>
      </ul>

      {/* Boutons d'action dans le menu burger (placés sous la croix) */}
      <div
        className={`flex-col space-y-4 ${isMenuOpen ? 'flex' : 'hidden'} md:hidden`}
      >
        <button
          type="button"
          className="p-1 border-2 shadow-lg rounded-lg bg-white border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-colors duration-300"
          onClick={handleOpenForm}
        >
          se connecter
        </button>
        <button
          type="button"
          className="p-1 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300"
          onClick={() => {}}
        >
          s'inscrire
        </button>
      </div>

      {/* Boutons d'action en desktop (cachés en mobile) */}
      <div className="hidden md:flex items-center space-x-4">
        <button
          type="button"
          className="p-1 border-2 shadow-lg rounded-lg bg-white border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-colors duration-300"
          onClick={handleOpenForm}
        >
          se connecter
        </button>
        <button
          type="button"
          className="p-1 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300"
          onClick={() => {}}
        >
          s'inscrire
        </button>
      </div>

      {/* Formulaire de connexion (affiché si isFormOpen est vrai) */}
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
