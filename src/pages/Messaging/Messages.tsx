import { useState, useEffect } from "react";
import AxiosInstance from "../../utils/axios";
import type { IUser, IMessage } from "../../@types";
import { useUser } from "../../context/UserContext";

/**
 * Composant Messages - Gère l'interface de messagerie entre utilisateurs
 * Fonctionnalités principales:
 * - Affichage des conversations existantes
 * - Création de nouvelles conversations
 * - Envoi de messages
 * - Mise à jour en temps réel de la liste des utilisateurs
 */
function Messages() {
  // --- États du composant ---
  const { user } = useUser(); // Utilisateur connecté actuel
  const [messages, setMessages] = useState<IMessage[]>([]); // Messages de la conversation active
  const [users, setUsers] = useState<IUser[]>([]); // Liste des utilisateurs avec conversations
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // ID de l'utilisateur sélectionné
  const [newMessage, setNewMessage] = useState(""); // Contenu du nouveau message
  const [newUserId, setNewUserId] = useState(""); // ID pour nouvelle conversation
  const [showNewMessageInput, setShowNewMessageInput] = useState(false); // Affichage du formulaire de nouvelle conversation
  const [isLoading, setIsLoading] = useState(false); // État de chargement

  /**
   * Charge les messages pour un utilisateur spécifique
   * @param targetUserId ID de l'utilisateur cible
   */
  const loadMessagesForUser = async (targetUserId: number) => {
    if (!user) return;
    setIsLoading(true);
    
    try {
      const response = await AxiosInstance.get<IMessage[]>(`/me/messages/${targetUserId}`);
      if (response.data) {
        setMessages(response.data);
        setSelectedUserId(targetUserId);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Gère la sélection d'un utilisateur dans la liste
   * @param userId ID de l'utilisateur sélectionné
   */
  const handleUserSelection = (userId: number) => {
    if (userId === selectedUserId) return;
    loadMessagesForUser(userId);
  };

  /**
   * Démarre une nouvelle conversation avec un utilisateur
   * Récupère d'abord les informations de l'utilisateur avant d'envoyer le message
   */
  const handleStartNewConversation = async () => {
    const userId = Number(newUserId);
    
    if (!newUserId.trim() || !newMessage.trim() || !user || 
        Number.isNaN(userId) || userId === user.id) {
      alert("Veuillez vérifier l'ID utilisateur et le message");
      return;
    }

    setIsLoading(true);

    try {
      // Récupération des informations de l'utilisateur
      const userResponse = await AxiosInstance.get<IUser>(`/users/${userId}`);
      const otherUser = userResponse.data;

      // Ajout de l'utilisateur à la liste avec les informations correctes
      setUsers(prev => prev.some(u => u.id === otherUser.id) 
        ? prev 
        : [...prev, otherUser]
      );

      // Envoi du message
      const response = await AxiosInstance.post<IMessage>(`/me/messages/${userId}`, {
        content: newMessage
      });

      if (response.data) {
        setSelectedUserId(userId);
        setMessages([response.data]);
        setNewMessage("");
        setNewUserId("");
        setShowNewMessageInput(false);
      }
    } catch (error) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      alert("Une erreur est survenue lors de l'envoi du message");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Envoie un message dans la conversation active
   */
  const handleSendMessage = async () => {
    if (!selectedUserId || !newMessage.trim() || !user) return;

    try {
      const response = await AxiosInstance.post<IMessage>(`/me/messages/${selectedUserId}`, {
        content: newMessage
      });

      if (response.data) {
        setMessages(prev => [...prev, response.data]);
        setNewMessage("");
      }
    } catch (error) {
      alert("Une erreur est survenue lors de l'envoi du message");
    }
  };

  /**
   * Effet pour charger les conversations initiales
   * Vérifie les 20 premiers utilisateurs pour trouver les conversations existantes
   */
  useEffect(() => {
    async function loadAllConversations() {
      if (!user) return;
      setIsLoading(true);

      try {
        const uniqueUsers = new Map<number, IUser>();
        const userIdsToCheck = Array.from({ length: 20 }, (_, i) => i + 1);
        let firstMessages: IMessage[] = [];
        let firstUserId: number | null = null;

        // Parcours des utilisateurs potentiels
        for (const id of userIdsToCheck) {
          if (id === user.id) continue;

          const response = await AxiosInstance.get<IMessage[]>(`/me/messages/${id}`)
            .catch(() => null);

          if (response?.data?.length) {
            const otherUser = response.data[0].sender_id === user.id 
              ? response.data[0].receiver 
              : response.data[0].sender;

            if (otherUser) {
              uniqueUsers.set(otherUser.id, otherUser);
              
              if (!firstUserId) {
                firstUserId = otherUser.id;
                firstMessages = response.data;
              }
            }
          }
        }

        // Mise à jour de l'état avec les utilisateurs trouvés
        setUsers(Array.from(uniqueUsers.values()));
        
        if (firstUserId && firstMessages.length) {
          setSelectedUserId(firstUserId);
          setMessages(firstMessages);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des conversations:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAllConversations();
  }, [user]);

  // Affichage du chargement si pas d'utilisateur connecté
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-bold">Chargement...</h2>
      </div>
    );
  }
// Affichage de la photo de profil par défaut en fonction du genre
const getDefaultProfilePicture = (gender: string | undefined) => {  
  if (gender === 'F') {
    return 'https://avatar.iran.liara.run/public/52';
  }
  if (gender === 'M') {
    return 'https://avatar.iran.liara.run/public/45';
  }
  // Par défaut, on affiche une silhouette
  return 'https://avatar.iran.liara.run/public/45';
};

  // Rendu principal de l'interface
  return (
    <main className="pt-16">
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* En-tête de la messagerie */}
        <div className="h-14 my-4 flex-shrink-0">
          <div className="bg-blue-50 h-full w-[300px] rounded-r-3xl flex items-center justify-center shadow-sm">
            <h1 className="text-2xl font-bold">Messages</h1>
          </div>
        </div>

        {/* Conteneur principal */}
        <div className="flex flex-1 mx-10 h-[calc(100vh-8rem)] overflow-hidden">
          {/* Barre latérale avec la liste des conversations */}
          <div className="w-64 bg-pink-50 rounded-l-3xl shadow-md flex flex-col">
            <div className="p-4 flex flex-col h-full overflow-hidden">
              {/* Bouton nouvelle conversation */}
              <button
                type="button"
                onClick={() => setShowNewMessageInput(!showNewMessageInput)}
                className="w-full p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                Nouveau message
              </button>

              {/* Formulaire de nouvelle conversation */}
              {showNewMessageInput && (
                <div className="space-y-2 p-2 mt-2 bg-white rounded-lg">
                  <input
                    type="text"
                    value={newUserId}
                    onChange={(e) => setNewUserId(e.target.value)}
                    placeholder="ID de l'utilisateur"
                    className="w-full p-2 rounded-lg border border-gray-200"
                  />
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Votre message"
                    className="w-full p-2 rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={handleStartNewConversation}
                    disabled={!newUserId || !newMessage || Number(newUserId) === user.id || isLoading}
                    className="w-full p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    Envoyer
                  </button>
                </div>
              )}

              {/* Liste des conversations */}
              <div className="mt-4 flex-1 overflow-y-auto">
                <div className="space-y-2">
                  {isLoading && !users.length ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent" />
                    </div>
                  ) : !users.length ? (
                    <div className="text-center text-gray-500 p-4">
                      Aucune conversation active
                    </div>
                  ) : (
                    users.map(chatUser => (
                      <button
                        type="button"
                        key={chatUser.id}
                        onClick={() => handleUserSelection(chatUser.id)}
                        className={`flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 w-full ${
                          selectedUserId === chatUser.id ? 'bg-gray-100' : ''
                        }`}
                        disabled={isLoading}
                      >
                        <img
  src={chatUser.picture || getDefaultProfilePicture(chatUser.gender)}
  alt={chatUser.userName}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <span className="bg-white px-4 py-1 rounded-full shadow-sm truncate">
                          {chatUser.userName}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Zone des messages */}
          <div className="flex-1 flex flex-col shadow-md border-y border-r border-gray-100 rounded-r-3xl bg-white">
            {/* Liste des messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {isLoading && !messages.length ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
                </div>
              ) : !selectedUserId ? (
                <div className="flex justify-center items-center h-full text-gray-500">
                  Sélectionnez un utilisateur pour voir les messages
                </div>
              ) : !messages.length ? (
                <div className="flex justify-center items-center h-full text-gray-500">
                  Aucun message dans cette conversation
                </div>
              ) : (
                messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === user.id ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-start space-x-2 max-w-md">
                      {message.sender_id !== user.id && (
                        <img
                        src={message.sender.picture || getDefaultProfilePicture(message.sender.gender)}
                        alt={message.sender.userName}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                      )}
                      <div>
                        <div className={`text-sm text-gray-600 ${message.sender_id === user.id ? "text-right" : "text-left"}`}>
                          {message.sender_id === user.id ? "Vous" : message.sender.userName}
                        </div>
                        <div className="mt-1 p-2.5 rounded-lg shadow-sm bg-gray-50 text-gray-900 break-words">
                          {message.content}
                        </div>
                      </div>
                      {message.sender_id === user.id && (
                        <img
                        src={user.picture || getDefaultProfilePicture(user.gender)}
                        alt="Vous"
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Zone de saisie des messages */}
            {selectedUserId && (
              <div className="p-3 bg-gray-100 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <img
  src={user.picture || getDefaultProfilePicture(user.gender)}
  alt="Vous"
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 flex items-center space-x-2 bg-white rounded-full border border-gray-200 pr-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Envoyer un message..."
                      className="flex-1 p-2 rounded-full border-none focus:outline-none min-w-0"
                      disabled={isLoading}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !isLoading && newMessage.trim()) {
                          handleSendMessage();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || isLoading}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 flex-shrink-0"
                      aria-label="Envoyer le message"
                    >
                      <svg
                        className="w-5 h-5 text-blue-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-labelledby="sendIconTitle"
                      >
                        <title id="sendIconTitle">Envoyer le message</title>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Messages;