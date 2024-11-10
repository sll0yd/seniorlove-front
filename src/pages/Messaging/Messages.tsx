import { useState, useEffect } from 'react';
import AxiosInstance from '../../utils/axios';
import type { IMessage, IUser } from '../../@types';
import { useUser } from '../../context/UserContext';

function MessageComponent({ recipient }: { recipient: IUser }) {
  const { user } = useUser();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Charger les messages entre l'utilisateur actuel et le destinataire
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await AxiosInstance.get(`/messages?recipient_id=${recipient.id}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des messages', error);
      }
    };

    if (recipient && user) {
      fetchMessages();
    }
  }, [recipient, user]);

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (newMessage.trim() === '' || !recipient) {
      return; // Ne rien faire si le message est vide ou si aucun destinataire n'est sélectionné
    }

    try {
      const message: Partial<IMessage> = {
        sender_id: user!.id,
        receiver_id: recipient.id,
        content: newMessage,
        created_at: new Date(),
      };

      const response = await AxiosInstance.post('/messages', message);
      setMessages([...messages, response.data]); // Ajouter le message à la liste
      setNewMessage(''); // Réinitialiser le champ de texte
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Messages avec {recipient.userName}</h2>
        <div className="overflow-y-auto max-h-80 p-4 border rounded-lg bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 p-2 rounded ${
                message.sender_id === user?.id ? 'bg-blue-200 self-end' : 'bg-gray-200'
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs text-gray-500">{message.created_at.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrire un message..."
          className="flex-1 p-2 border rounded-l-md focus:outline-none"
        />
        <button
          type="button"
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default MessageComponent;
