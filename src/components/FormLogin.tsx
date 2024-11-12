import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import AxiosInstance from '../utils/axios';
import { useUser } from '../context/UserContext';

interface FormLoginProps {
  onClose: () => void;
  userName: string | undefined;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const FormLogin: React.FC<FormLoginProps> = ({
  onClose,
  userName,
  setUserName,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(false);
  const { setUser, authErrorMsg, setAuthErrorMsg } = useUser();
  const modalRef = useRef<HTMLDivElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formElm = event.currentTarget;

    // Récupérer les données du formulaire
    const formData = new FormData(formElm);
    const data = Object.fromEntries(formData);

    // Appel de l'API pour se connecter
    AxiosInstance.post('/login', data)
      .then((response) => {
        const { user, accessToken } = response.data;

        // Stocker le token dans localStorage pour que l'intercepteur l'ajoute automatiquement
        localStorage.setItem('token', accessToken);
        setUser(user);
        setUserName(user.userName); // Met à jour userName dans Nav
        formElm.reset(); // Réinitialise le formulaire
        setShowWelcomeMessage(true);
        setErrorMessage(undefined);
        setAuthErrorMsg(null);

        // Timer pour masquer le message et fermer le formulaire après 5 secondes
        setTimeout(() => {
          setShowWelcomeMessage(false); // Cache le message après 4 secondes
          handleCloseModal();
          onClose();
        }, 4000);
      })
      .catch(() => {
        setErrorMessage('Erreur lors de la connexion'); // Affiche le message d'erreur
      });
  }
  const handleCloseModal = useCallback(() => {
    setAuthErrorMsg(null);
    onClose();
  }, [onClose, setAuthErrorMsg]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleCloseModal();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleCloseModal]);

  return (
    <div>
      <div ref={modalRef} className="">
        {/* Affiche "Bonjour {userName}" si l'utilisateur est connecté */}
        {showWelcomeMessage && userName ? (
          <div>Bonjour {userName}</div>
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
        {(errorMessage || authErrorMsg) && (
          <div className="text-red-500 text-sm">
            {errorMessage || authErrorMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormLogin;
