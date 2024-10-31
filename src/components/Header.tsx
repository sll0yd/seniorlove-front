import { useState } from 'react';
import type { FormEvent } from 'react';

type SignUpFormData = {
  gender: string;
  username: string;
  birthYear: number | '';  // To keep place holder empty
  email: string;
  password: string;
}

function Header() {
  const [formData, setFormData] = useState<SignUpFormData>({
    gender: '',
    username: '',
    birthYear: '',  
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Future APi Post
  };

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
              <form onSubmit={handleSubmit} className="space-y-4">
                <fieldset>
                  <legend className="mb-2">Je suis</legend>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        id="gender-femme"
                        type="radio"
                        name="gender"
                        value="femme"
                        checked={formData.gender === 'femme'}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <label htmlFor="gender-femme">Femme</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="gender-homme"
                        type="radio"
                        name="gender"
                        value="homme"
                        checked={formData.gender === 'homme'}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <label htmlFor="gender-homme">Homme</label>
                    </div>
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="username" className="block mb-1 text-sm">
                    Nom d'utilisateur
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="votre nom d'utilisateur"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="birthYear" className="block mb-1 text-sm">
                    Année de naissance
                  </label>
                  <input
                    id="birthYear"
                    type="number"
                    name="birthYear"
                    value={formData.birthYear}
                    onChange={handleChange}
                    placeholder="votre année de naissance"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1 text-sm">
                    Adresse email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre adresse email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-1 text-sm">
                    Choisissez un mot de passe
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
