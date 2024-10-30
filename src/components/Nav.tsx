function Nav() {
  return (
    <nav className="flex justify-between p-4 bg-white shadow-md ">
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
          className="p-1 border-2 mr-6 shadow-lg rounded-lg"
          onClick={() => {}}
        >
          se connecter
        </button>
        <button
          type="button"
          className="p-1 border-custom-pink border-2 mr-6 shadow-lg rounded-lg text-custom-pink"
          onClick={() => {}}
        >
          s'inscrire
        </button>
      </div>
    </nav>
  );
}

export default Nav;
