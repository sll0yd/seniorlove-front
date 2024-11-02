import { useState } from 'react';

interface FormLoginProps {
  onClose: () => void; // Type pour onClose
}

const FormLogin: React.FC<FormLoginProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Nom d'utilisateur: ${username}, Mot de passe: ${password}`);
    setUsername('');
    setPassword('');
    onClose(); // Fermer le formulaire après soumission
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom d'utilisateur:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)} // Met à jour l'état à chaque saisie
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Entrez votre nom d'utilisateur"
          required
        />
      </label>
      <label>
        Mot de passe:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)} // Met à jour l'état à chaque saisie
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Entrez votre mot de passe"
          required
        />
      </label>
      <button className="" type="submit">
        connexion
      </button>
    </form>
  );
};

export default FormLogin;
