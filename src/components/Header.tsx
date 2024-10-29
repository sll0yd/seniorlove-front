function  Header() {
  return (
    <header>
     <div className="bg-gray-200 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">INSCRIVEZ-VOUS</h2>
      <form className="space-y-4">
        <div className="flex items-center">
          {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
          <label className="mr-4">Je suis</label>
          <div className="flex items-center">
            <label className="mr-2">
              <input type="radio" name="gender" value="femme" className="mr-1" />
              Femme
            </label>
            <label>
              <input type="radio" name="gender" value="homme" className="mr-1" defaultChecked />
              Homme
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="username" className="block font-medium mb-1">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="border rounded px-3 py-2 w-full"
            placeholder="votre nom d'utilisateur"
          />
        </div>
        <div>
          <label htmlFor="birthYear" className="block font-medium mb-1">
            Année de naissance
          </label>
          <input
            type="text"
            id="birthYear"
            name="birthYear"
            className="border rounded px-3 py-2 w-full"
            placeholder="votre année de naissance"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Adresse email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border rounded px-3 py-2 w-full"
            placeholder="votre adresse email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Choisissez un mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border rounded px-3 py-2 w-full"
            placeholder="mot de passe"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          M'INSCRIRE
        </button>
      </form>
    </div>

    </header>
  );
}

export default Header;

