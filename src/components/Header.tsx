function Header() {
  return (
    <header>
      <div className="relative w-full min-h-[720px]">
        <div className="absolute inset-0">
          <img
            src="/images/coupleheureux.JPG"
            alt="Couple heureux"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative w-full h-full flex items-center justify-start pt-20">
          <div className="ml-8 md:ml-12 w-full max-w-sm">
            <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-center mb-6">
                INSCRIVEZ-VOUS
              </h2>
              <form className="space-y-4">
                <div>
                  <p className="mb-2">Je suis</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="femme"
                        className="w-4 h-4"
                      />
                      <span>Femme</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="homme"
                        className="w-4 h-4"
                      />
                      <span>Homme</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    placeholder="votre nom d'utilisateur"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">
                    Année de naissance
                  </label>
                  <input
                    type="text"
                    placeholder="votre année de naissance"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Adresse email</label>
                  <input
                    type="email"
                    placeholder="votre adresse email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">
                    Choisissez un mot de passe
                  </label>
                  <input
                    type="password"
                    placeholder="mot de passe"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-6"
                >
                  M'INSCRIRE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
