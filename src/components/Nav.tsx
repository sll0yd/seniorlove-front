import FormLogin from './FormLogin';
import { useState } from 'react';

function Nav() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = (): void => {
    setIsFormOpen(true); // Ouvre le formulaire
  };

  const handleCloseForm = (): void => {
    setIsFormOpen(false); // Ferme le formulaire
  };

  return (
    <nav className="fixed flex justify-between p-4 bg-white shadow-lg z-50 w-full">
      <a className="w-64 h-8" href="/">
        <img src="/icon/SL_logo.png" alt="logo coeur" className="" />
      </a>
      <ul className="flex space-x-20 m-auto">
        <li>
          <a href="/" className="">
            Qui sommes-nous ?
          </a>
        </li>
        <li>
          <a href="/" className="">
            Évènements
          </a>
        </li>
        <li>
          <a href="/" className="">
            Témoignages
          </a>
        </li>
      </ul>
      <div className="items-center mr-1">
        <button
          type="button"
          className="p-1 border-2 mr-6 shadow-lg rounded-lg bg-white border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-colors duration-300"
          onClick={handleOpenForm} // Ouvre le formulaire
        >
          se connecter
        </button>
        <button
          type="button"
          className="p-1 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300 mr-6"
          onClick={() => {}}
        >
          s'inscrire
        </button>
      </div>

      {/* Affiche le formulaire si isFormOpen est vrai */}
      {isFormOpen && (
        <div className="absolute top-20 right-10 w-80 bg-white shadow-xl rounded-lg p-4 z-10">
          <FormLogin onClose={handleCloseForm} />
        </div>
      )}
    </nav>
  );
}

export default Nav;
