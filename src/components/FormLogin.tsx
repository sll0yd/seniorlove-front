import { type FormEvent, useState } from 'react';
import AxiosInstance from '../utils/axios';

interface FormLoginProps {
  onClose: () => void; // Type pour onClose
  userName: string | undefined; // Recevoir le userName en props
  setUserName: React.Dispatch<React.SetStateAction<string>>; // Setter pour le userName
}

const FormLogin: React.FC<FormLoginProps> = ({
  onClose,
  userName,
  setUserName,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(false); // État pour contrôler l'affichage du message

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault(); // On empêche le rechargement de la page
    const formElm = event.currentTarget;

    // Récupérer les données du formulaire
    const formData = new FormData(formElm);
    const data = Object.fromEntries(formData);

    // Appel de l'API pour se connecter
    AxiosInstance.post('/login', data)
      .then((response) => {
        const { user, token } = response.data;
        console.log(response.data);

        // Stocker le token dans localStorage pour que l'intercepteur l'ajoute automatiquement
        localStorage.setItem('token', token);

        setUserName(user.userName); // Met à jour userName dans Nav
        formElm.reset(); // Réinitialise le formulaire
        setShowWelcomeMessage(true);
        setErrorMessage(undefined); // Affiche le message de bienvenue

        // Timer pour masquer le message et fermer le formulaire après 5 secondes
        setTimeout(() => {
          setShowWelcomeMessage(false); // Cache le message après 5 secondes
          onClose(); // Ferme le formulaire
        }, 4000);
      })
      .catch(() => {
        setErrorMessage('Erreur lors de la connexion'); // Affiche le message d'erreur
      });
  }

  return (
    <div>
      {/* Affiche "Bonjour {userName}" si l'utilisateur est connecté */}
      {showWelcomeMessage && userName ? (
        <div>Bonjour {userName}</div> // Affiche le message de bienvenue
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Entrez votre email"
              required
            />
          </label>
          <label>
            Mot de passe:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Entrez votre mot de passe"
              required
            />
          </label>
          <button
            className="bg-blue-400 text-white p-2 rounded mt-4"
            type="submit"
          >
            Connexion
          </button>
        </form>
      )}
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormLogin;
