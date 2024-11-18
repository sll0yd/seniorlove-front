import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { z } from "zod";
import axios from "axios";
import { useUser } from "../context/UserContext";

// Définition du type pour les données du formulaire d'inscription
// Cette interface définit la structure exacte des données que nous allons gérer
type SignUpFormData = {
  gender: string; // Genre de l'utilisateur ('H' ou 'F')
  userName: string; // Nom d'utilisateur
  age: number | ""; // Âge (peut être un nombre ou une chaîne vide pour le placeholder)
  email: string; // Adresse email
  password: string; // Mot de passe
};

// Schéma de validation Zod pour les données du formulaire
// Zod nous permet de définir des règles de validation précises pour chaque champ
const signUpSchema = z.object({
  // Le genre doit être soit 'H' soit 'F'
  gender: z.enum(["H", "F"], {
    required_error: "Le genre est requis",
  }),
  // Le nom d'utilisateur doit avoir au moins 1 caractère
  userName: z.string().min(1, "Le nom d'utilisateur est requis"),
  // L'âge doit être un nombre d'au moins 60 ans
  // preprocess permet de convertir la valeur en nombre avant la validation
  age: z.preprocess(
    (val) => Number(val),
    z.number().min(60, "Vous devez avoir au moins 60 ans"),
  ),
  // L'email doit être une adresse email valide
  email: z.string().email("Adresse email invalide"),
  // Le mot de passe doit avoir au moins 6 caractères
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

function Header() {
  // Récupération de l'utilisateur depuis le contexte d'authentification
  const { user } = useUser();

  // État pour gérer l'affichage de l'alerte de confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);

  // État local pour gérer les données du formulaire
  // useState permet de créer une variable d'état et sa fonction de mise à jour
  const [formData, setFormData] = useState<SignUpFormData>({
    gender: "",
    userName: "",
    age: "",
    email: "",
    password: "",
  });

  // État pour gérer les messages d'erreur
  const [errorMessages, setErrorMessages] = useState<string | null>(null);

  // Effect pour gérer la disparition automatique de l'alerte après 3 secondes
  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);

      // Nettoyage du timer si le composant est démonté
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);

  // Fonction pour gérer les changements dans les champs du formulaire
  // Cette fonction est appelée à chaque modification d'un champ
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Mise à jour de l'état en conservant les autres valeurs (spread operator ...)
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fonction pour gérer la soumission du formulaire
  // Cette fonction est asynchrone car elle fait un appel API
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Empêche le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();

    // Validation des données du formulaire avec le schéma Zod
    const validationResult = signUpSchema.safeParse(formData);
    // Si la validation échoue, on affiche le premier message d'erreur
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0].message;
      setErrorMessages(firstError);
      return;
    }

    // Si la validation réussit, on envoie les données à l'API
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        validationResult.data,
      );
      console.log("Formulaire soumis avec succès:", response.data);
      // Réinitialisation des états après succès
      setErrorMessages(null);
      setFormData({
        gender: "",
        userName: "",
        age: "",
        email: "",
        password: "",
      });
      // Affiche l'alerte de confirmation après inscription réussie
      setShowConfirmation(true);
    } catch (error) {
      // En cas d'erreur lors de l'appel API
      console.error("Erreur lors de la soumission:", error);
      setErrorMessages("Une erreur s'est produite lors de l'inscription");
    }
  };

  return (
    <header>
      <div className="relative w-full min-h-[720px]">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src="/images/coupleheureux.JPG"
            alt="Couple heureux"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative w-full h-full flex items-center justify-start pt-20">
          {/* Condition : si pas d'utilisateur connecté, on affiche le formulaire */}
          {!user ? (
            <div className="ml-4 mr-4 md:ml-12 w-full max-w-sm">
              <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">
                  INSCRIVEZ-VOUS
                </h2>
                {/* Formulaire d'inscription */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Affichage des messages d'erreur s'il y en a */}
                  {errorMessages && (
                    <p className="text-red-500 text-center">{errorMessages}</p>
                  )}

                  {/* Groupe de boutons radio pour le genre */}
                  <fieldset>
                    <legend className="mb-2">Je suis</legend>
                    <div className="flex gap-4">
                      {/* Option Femme */}
                      <div className="flex items-center gap-2">
                        <input
                          id="gender-femme"
                          type="radio"
                          name="gender"
                          value="F"
                          checked={formData.gender === "F"}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <label htmlFor="gender-femme">Femme</label>
                      </div>
                      {/* Option Homme */}
                      <div className="flex items-center gap-2">
                        <input
                          id="gender-homme"
                          type="radio"
                          name="gender"
                          value="M"
                          checked={formData.gender === "M"}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <label htmlFor="gender-homme">Homme</label>
                      </div>
                    </div>
                  </fieldset>

                  {/* Champ Nom d'utilisateur */}
                  <div>
                    <label htmlFor="userName" className="block mb-1 text-sm">
                      Nom d'utilisateur:
                    </label>
                    <input
                      id="userName"
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      placeholder="votre nom d'utilisateur"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Champ Âge */}
                  <div>
                    <label htmlFor="age" className="block mb-1 text-sm">
                      Votre âge:
                    </label>
                    <input
                      id="age"
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="votre âge"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>

                  {/* Champ Email */}
                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm">
                      Adresse email:
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

                  {/* Champ Mot de passe */}
                  <div>
                    <label htmlFor="password" className="block mb-1 text-sm">
                      Choisissez un mot de passe:
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="votre mot de passe"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Bouton de soumission */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-6"
                  >
                    M'INSCRIRE
                  </button>
                </form>
              </div>

              {/* Alerte de confirmation qui apparaît sous le formulaire */}
              {showConfirmation && (
                <button type="button" 
                  onClick={() => setShowConfirmation(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Escape') {
                      setShowConfirmation(false);
                    }
                  }}
                  className="w-full mt-4 bg-green-100 border border-green-400 text-green-700 px-8 py-4 rounded-lg shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <p className="text-center font-medium">
                    Inscription réussie ! Veuillez vous connecter pour accéder au site.
                  </p>
                </button>
              )}
            </div>
          ) : (
            // Si l'utilisateur est connecté, on affiche un message de bienvenue
            <div className="mr-24 md:mr-32 ml-auto w-fit max-w-[320px] mt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-lg">
                <h2 className="text-2xl font-bold text-center truncate">
                  Bienvenue {user.userName}
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;