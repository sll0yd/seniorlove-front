import { useState, useEffect } from "react";
import AxiosInstance from "../../utils/axios";
import type { IUser } from "../../@types";
import { useUser } from "../../context/UserContext";
import type { AxiosError } from "axios";

// Interface définissant la structure d'un message
interface Message {
  id: number;
  content: string;
  sender_id: number;          // ID de l'expéditeur
  receiver_id: number;        // ID du destinataire
  sender: IUser;             // Objet utilisateur complet de l'expéditeur
  receiver: IUser;           // Objet utilisateur complet du destinataire
}

// Interface pour typer les réponses d'erreur de l'API
interface ErrorResponse {
  status: number;
  message: string;
}

function Messages() {
  // Récupération de l'utilisateur connecté depuis le contexte
  const { user } = useUser();
  
  // États du composant
  const [messages, setMessages] = useState<Message[]>([]); // Liste des messages de la conversation active
  const [users, setUsers] = useState<IUser[]>([]);        // Liste des utilisateurs avec qui on a déjà discuté
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // ID de l'utilisateur sélectionné
  const [newMessage, setNewMessage] = useState("");       // Contenu du nouveau message en cours de rédaction

  // Récupère l'utilisateur complet à partir de son ID
  const selectedUser = selectedUserId 
    ? users.find(u => u.id === selectedUserId) 
    : null;

  // Effet pour charger la liste des utilisateurs avec qui on a échangé des messages
  useEffect(() => {
    const fetchMessagingUsers = async () => {
      if (!user) return; // Si pas d'utilisateur connecté, on ne fait rien
      
      try {
        // Récupère tous les messages de l'utilisateur
        const response = await AxiosInstance.get('/me/messages');
        const allMessages: Message[] = response.data;
        
        // Map pour stocker les utilisateurs uniques (évite les doublons)
        const uniqueUsers = new Map<number, IUser>();
        
        // Parcourt tous les messages pour extraire les utilisateurs
        for (const message of allMessages) {
          // Si l'expéditeur n'est pas l'utilisateur courant, on l'ajoute
          if (message.sender_id !== user.id) {
            uniqueUsers.set(message.sender_id, message.sender);
          }
          
          // Si le destinataire n'est pas l'utilisateur courant, on l'ajoute
          if (message.receiver_id !== user.id) {
            uniqueUsers.set(message.receiver_id, message.receiver);
          }
        }
        
        // Convertit la Map en tableau et met à jour l'état
        setUsers(Array.from(uniqueUsers.values()));
      } catch (error) {
        if (error instanceof Error) {
          console.error("Échec du chargement des utilisateurs:", error.message);
        }
      }
    };
    
    fetchMessagingUsers();
  }, [user]); // Relance l'effet si l'utilisateur change

  // Effet pour charger les messages avec l'utilisateur sélectionné
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUserId || !user) return; // Vérifie qu'un utilisateur est sélectionné
      try {
        const response = await AxiosInstance.get(`/me/messages/${selectedUserId}`);
        setMessages(response.data);
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.status === 404) {
          // Si pas de messages, initialise avec un tableau vide
          setMessages([]);
        } else {
          console.error("Échec du chargement des messages:", axiosError.message);
        }
      }
    };
    fetchMessages();
  }, [selectedUserId, user]); // Relance l'effet si l'utilisateur sélectionné change

  // Fonction pour envoyer un nouveau message
  const handleSendMessage = async () => {
    if (!newMessage || !selectedUser || !user) return;

    try {
      // Envoie le message à l'API
      const response = await AxiosInstance.post(`/me/messages/${selectedUser.id}`, {
        content: newMessage,
      });
      
      // Ajoute les informations complètes des utilisateurs au message
      const newMessageWithUsers = {
        ...response.data,
        sender: user,
        receiver: selectedUser
      };
      
      // Ajoute le nouveau message à la liste existante
      setMessages((prevMessages) => [...prevMessages, newMessageWithUsers]);
      setNewMessage(""); // Vide le champ de saisie
    } catch (error) {
      if (error instanceof Error) {
        console.error("Échec de l'envoi du message:", error.message);
      }
    }
  };

  // Fonction appelée quand on sélectionne un utilisateur dans la liste
  const handleUserSelection = (user: IUser) => {
    setSelectedUserId(user.id);
    setMessages([]); // Vide les messages précédents
  };

  return (
    <main className="pt-16">
      <div className="flex flex-col h-[calc(100vh-6rem)]">
        {/* En-tête */}
        <div className="h-14 my-4">
          <div className="bg-blue-50 h-full w-[300px] rounded-r-3xl flex items-center justify-center shadow-sm">
            <h1 className="text-2xl font-bold">Messagerie</h1>
          </div>
        </div>

        <div className="flex flex-1 mx-10">
          {/* Barre latérale gauche - Liste des utilisateurs */}
          <div className="w-64 p-4 bg-pink-50 rounded-l-3xl shadow-md">
            {/* Barre de recherche */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Recherche..."
                className="w-full p-2 rounded-lg border border-gray-200"
              />
            </div>

            {/* Liste des utilisateurs */}
            <div className="space-y-2">
              {users.map((chatUser) => (
                <button
                  key={chatUser.id}
                  onClick={() => handleUserSelection(chatUser)}
                  className={`flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 cursor-pointer w-full transition-colors ${
                    selectedUserId === chatUser.id ? 'bg-gray-100' : ''
                  }`}
                  type="button"
                >
                  <img
                    src={chatUser.picture || "/default-avatar.png"}
                    alt={chatUser.userName}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="bg-white px-4 py-1 rounded-full shadow-sm">
                    {chatUser.userName}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Zone principale - Messages et input */}
          <div className="flex-1 flex flex-col shadow-md border-y border-r border-gray-100 rounded-r-3xl">
            {/* Zone des messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender_id === user?.id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex items-start space-x-2 max-w-md">
                    {/* Avatar de l'expéditeur (si ce n'est pas nous) */}
                    {message.sender_id !== user?.id && (
                      <img
                        src={message.sender.picture || "/default-avatar.png"}
                        alt={message.sender.userName}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      {/* Nom de l'expéditeur */}
                      <div
                        className={`text-sm text-gray-600 ${
                          message.sender_id === user?.id ? "text-right" : "text-left"
                        }`}
                      >
                        {message.sender_id === user?.id
                          ? "Vous"
                          : message.sender.userName}
                      </div>
                      {/* Contenu du message */}
                      <div className="mt-1 p-2.5 rounded-lg shadow-sm bg-gray-50 text-gray-900">
                        {message.content}
                      </div>
                    </div>
                    {/* Notre avatar (si nous sommes l'expéditeur) */}
                    {message.sender_id === user?.id && (
                      <img
                        src={message.sender.picture || "/default-avatar.png"}
                        alt="You"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Zone de saisie du message */}
            <div className="p-3 bg-gray-100">
              <div className="flex items-center space-x-2">
                {/* Notre avatar */}
                <img
                  src={user?.picture || "/default-avatar.png"}
                  alt="You"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 flex items-center space-x-2 bg-white rounded-full border border-gray-200 pr-2">
                  {/* Champ de saisie */}
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Envoyer un message..."
                    className="flex-1 p-2 rounded-full border-none focus:outline-none"
                    disabled={!selectedUser}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  {/* Bouton d'envoi */}
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!selectedUser || !newMessage.trim()}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                    aria-label="Envoyer le message"
                    title="Envoyer le message"
                  >
                    <svg
                      className="w-5 h-5 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      role="img"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Messages;