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
  const [isLoading, setIsLoading] = useState(false); // État de chargement

  /**
   * Charge les messages pour un utilisateur spécifique
   * @param targetUserId ID de l'utilisateur cible
   */
  const loadMessagesForUser = async (targetUserId: number) => {
    if (!user) return setIsLoading(false);
    setIsLoading(true);
    try {
      const response = await AxiosInstance.get<IMessage[]>(
        `/me/messages/${targetUserId}`
      );
      if (response.data) {
        setMessages(response.data);
        setSelectedUserId(targetUserId);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Erreur lors du chargement des messages:", error);
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
   * Envoie un message dans la conversation active
   */
  const handleSendMessage = async () => {
    if (!selectedUserId || !newMessage.trim() || !user) return;

    try {
      const response = await AxiosInstance.post<IMessage>(
        `/me/messages/${selectedUserId}`,
        {
          content: newMessage,
        }
      );
      if (response.data) {
        setMessages((prev) => [...prev, response.data]);
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
      setIsLoading(true);
      try {
        const response = await AxiosInstance.get("/me/contacts");
        console.log("response :>> ", response);
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("error :>> ", error);
      }
    }
    loadAllConversations();
  }, []);

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
    if (gender === "F") {
      return "https://avatar.iran.liara.run/public/52";
    }
    if (gender === "M") {
      return "https://avatar.iran.liara.run/public/45";
    }
    // Par défaut, on affiche une silhouette
    return "https://avatar.iran.liara.run/public/45";
  };

  useEffect(() => {
    console.log("isLoading :>> ", isLoading);
  }, [isLoading]);
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
        <div className="flex flex-1 mx-10 h-[calc(100vh-8rem)] overflow-hidden flex-col md:flex-row">
          {/* Barre latérale avec la liste des conversations */}
          <div className="w-full md:w-64 bg-pink-50 rounded-xl md:rounded-l-xl md:rounded-r-none shadow-md flex flex-col mb-2 md:min-h-screen">
            <div className="p-4 flex flex-col h-full overflow-hidden">
              {/* Liste des conversations */}
              <div className="mt-4 flex-1">
                {/* Comportement horizontal sur petits écrans */}
                <div className="space-x-2 flex overflow-x-auto whitespace-nowrap md:flex-col md:space-x-0 md:space-y-2">
                  {isLoading ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent" />
                    </div>
                  ) : !users.length ? (
                    <div className="text-center text-gray-500 p-4">
                      Aucune conversation active
                    </div>
                  ) : (
                    users.map((chatUser) => (
                      <button
                        type="button"
                        key={chatUser.id}
                        onClick={() => handleUserSelection(chatUser.id)}
                        className={`flex items-center space-x-3 p-2 rounded-full hover:bg-gray-200 w-auto ${
                          selectedUserId === chatUser.id ? "bg-gray-100" : ""
                        }`}
                        disabled={isLoading}
                      >
                        <img
                          src={
                            chatUser.picture ||
                            getDefaultProfilePicture(chatUser.gender)
                          }
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
          <div className="flex-1 flex flex-col shadow-md border border-gray-100 rounded-t-3xl md:rounded-r-3xl md:rounded-t-none md:border-l-0 md:border-y md:border-r bg-white">
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
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender_id === user.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className="flex items-start space-x-2 max-w-md">
                      {message.sender_id !== user.id && (
                        <img
                          src={
                            message.sender.picture ||
                            getDefaultProfilePicture(message.sender.gender)
                          }
                          alt={message.sender.userName}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                      )}
                      <div>
                        <div
                          className={`text-sm text-gray-600 ${
                            message.sender_id === user.id
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          {message.sender_id === user.id
                            ? "Vous"
                            : message.sender.userName}
                        </div>
                        <div className="mt-1 p-2.5 rounded-lg shadow-sm bg-gray-50 text-gray-900 break-words">
                          {message.content}
                        </div>
                      </div>
                      {message.sender_id === user.id && (
                        <img
                          src={
                            user.picture ||
                            getDefaultProfilePicture(user.gender)
                          }
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
                      className="flex-grow p-2 rounded-full border-none focus:outline-none min-w-0"
                      disabled={isLoading}
                      onKeyPress={(e) => {
                        if (
                          e.key === "Enter" &&
                          !isLoading &&
                          newMessage.trim()
                        ) {
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
