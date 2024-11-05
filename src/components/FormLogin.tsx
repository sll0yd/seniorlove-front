import { type FormEvent, useState, useEffect } from 'react';
import AxiosInstance from '../utils/axios';

interface FormLoginProps {
  onClose: () => void;
  userName: string | null;
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, you can verify the token with the server here
      AxiosInstance.get('/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          const { user } = response.data;
          setUserName(user.userName || null);
        })
        .catch((error) => {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
        });
    }
  }, [setUserName]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formElm = event.currentTarget;
    const formData = new FormData(formElm);
    const data = Object.fromEntries(formData);

    AxiosInstance.post('/login', data)
      .then((response) => {
        const { user, accessToken } = response.data;

        if (accessToken) {
          localStorage.setItem('token', accessToken);
        } else {
          console.error('Token non trouvé dans la réponse.');
        }

        setUserName(user.userName);
        formElm.reset();
        setShowWelcomeMessage(true);
        setErrorMessage(undefined);

        setTimeout(() => {
          setShowWelcomeMessage(false);
          onClose();
        }, 4000);
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion:', error);
        setErrorMessage('Erreur lors de la connexion');
      });
  }

  return (
    <div>
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
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormLogin;
