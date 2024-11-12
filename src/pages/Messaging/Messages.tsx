import { useState, useEffect } from "react";
import AxiosInstance from "../../utils/axios";
import type { IUser } from "../../@types";
import { useUser } from "../../context/UserContext";
import type { AxiosError } from "axios";

interface Message {
  id: number;
  content: string;
  sender_id: number;
  receiver_id: number;
  sender: IUser;
  receiver: IUser;
  created_at: string;
  updated_at: string;
}

interface ApiError {
  message: string;
  status: number;
  error: string;
}

function Messages() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showNewMessageInput, setShowNewMessageInput] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all conversations for current user
  useEffect(() => {
    const loadConversations = async () => {
      if (!user) return;

      setIsLoading(true);
      setError(null);
      
      try {
        // Try to get all conversations for current user
        const response = await AxiosInstance.get(`/me/messages/${user.id}`);
        const allMessages: Message[] = [];
        const uniqueUsers = new Map<number, IUser>();

        if (response.data) {
          const messages = Array.isArray(response.data) ? response.data : [response.data];
          allMessages.push(...messages);

          // Extract users from messages
          for (const message of messages) {
            if (message.sender_id !== user.id) {
              uniqueUsers.set(message.sender_id, message.sender);
            }
            if (message.receiver_id !== user.id) {
              uniqueUsers.set(message.receiver_id, message.receiver);
            }
          }

          // For each unique user, try to get their messages as well
          for (const [otherId, otherUser] of uniqueUsers) {
            try {
              const userResponse = await AxiosInstance.get(`/me/messages/${otherId}`);
              if (userResponse.data) {
                const userMessages = Array.isArray(userResponse.data) 
                  ? userResponse.data 
                  : [userResponse.data];
                
                // Add any messages we don't already have
                for (const message of userMessages) {
                  if (!allMessages.some(m => m.id === message.id)) {
                    allMessages.push(message);
                  }
                }
              }
            } catch (error) {
              const axiosError = error as AxiosError;
              if (axiosError.response?.status !== 404) {
                console.error(`Error loading messages for user ${otherId}:`, error);
              }
            }
          }
        }

        // Update state with all fetched data
        const uniqueUsersArray = Array.from(uniqueUsers.values()).filter(Boolean);
        
        setMessages(allMessages);
        setUsers(uniqueUsersArray);

        // Select first user if we have conversations
        if (uniqueUsersArray.length > 0 && !selectedUserId) {
          setSelectedUserId(uniqueUsersArray[0].id);
        }

      } catch (error) {
        // Ignore 404 for users without any messages yet
        const axiosError = error as AxiosError;
        if (axiosError.response?.status !== 404) {
          console.error('Error loading conversations:', error);
          setError('Erreur lors du chargement des conversations');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, [user]);

  // Handle selecting a user
  const handleUserSelection = async (userId: number) => {
    if (!user || userId === user.id) return;
    
    setSelectedUserId(userId);
    setIsLoading(true);
    setError(null);

    try {
      const response = await AxiosInstance.get(`/me/messages/${userId}`);
      if (response.data) {
        const newMessages = Array.isArray(response.data) ? response.data : [response.data];
        setMessages(prevMessages => {
          const otherMessages = prevMessages.filter(msg => 
            !(msg.sender_id === userId || msg.receiver_id === userId)
          );
          return [...otherMessages, ...newMessages];
        });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Erreur lors du chargement des messages');
    } finally {
      setIsLoading(false);
    }
  };

  // Start new conversation
  const handleStartNewConversation = async () => {
    if (!user || !newUserId.trim() || !newMessage.trim()) return;
    
    const userId = parseInt(newUserId);
    if (isNaN(userId)) {
      alert("Veuillez entrer un ID utilisateur valide");
      return;
    }

    if (userId === user.id) {
      alert("Vous ne pouvez pas vous envoyer un message à vous-même");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await AxiosInstance.post<Message>(`/me/messages/${userId}`, {
        content: newMessage
      });

      if (response.data) {
        // Add message to state
        setMessages(prev => [...prev, response.data]);

        // Add the other user to our users list
        const otherUser = response.data.sender_id === user.id 
          ? response.data.receiver 
          : response.data.sender;

        if (otherUser) {
          setUsers(prev => {
            const existingUser = prev.find(u => u && u.id === otherUser.id);
            if (!existingUser) {
              return [...prev, otherUser];
            }
            return prev;
          });

          // Select the new conversation
          setSelectedUserId(otherUser.id);
        }

        // Reset form
        setNewMessage("");
        setNewUserId("");
        setShowNewMessageInput(false);
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
      const axiosError = error as AxiosError<ApiError>;
      const errorMessage = axiosError.response?.data?.error || "Une erreur est survenue lors de l'envoi du message";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Send message in existing conversation
  const handleSendMessage = async () => {
    if (!selectedUserId || !newMessage.trim() || !user) return;

    try {
      const response = await AxiosInstance.post<Message>(`/me/messages/${selectedUserId}`, {
        content: newMessage
      });

      if (response.data) {
        setMessages(prev => [...prev, response.data]);
        setNewMessage("");
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const axiosError = error as AxiosError<ApiError>;
      const errorMessage = axiosError.response?.data?.error || "Une erreur est survenue lors de l'envoi du message";
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  // Get current selected user
  const selectedUser = selectedUserId 
    ? users.find(u => u && u.id === selectedUserId) 
    : null;

  // Filter and sort messages for current conversation
  const selectedUserMessages = selectedUserId 
    ? messages
        .filter(message => 
          (message.sender_id === selectedUserId && message.receiver_id === user?.id) ||
          (message.receiver_id === selectedUserId && message.sender_id === user?.id)
        )
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    : [];

		if (!user) {
			return (
				<div className="flex items-center justify-center h-screen">
					<div className="text-center">
						<h2 className="text-2xl font-bold mb-4">Chargement...</h2>
						<p>Veuillez patienter pendant que nous chargeons vos informations.</p>
					</div>
				</div>
			);
		}
	
		return (
			<main className="pt-16">
				<div className="flex flex-col h-[calc(100vh-4rem)]">
					<div className="h-14 my-4 flex-shrink-0">
						<div className="bg-blue-50 h-full w-[300px] rounded-r-3xl flex items-center justify-center shadow-sm">
							<h1 className="text-2xl font-bold">Messagerie</h1>
						</div>
					</div>
	
					<div className="flex flex-1 mx-10 h-[calc(100vh-8rem)] overflow-hidden">
						<div className="w-64 bg-pink-50 rounded-l-3xl shadow-md flex flex-col">
							<div className="p-4 flex flex-col h-full overflow-hidden">
								<div className="flex-shrink-0 space-y-2">
									<button
										onClick={() => setShowNewMessageInput(!showNewMessageInput)}
										className="w-full p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
									>
										Nouveau message
									</button>
	
									{showNewMessageInput && (
										<div className="space-y-2 p-2 bg-white rounded-lg">
											<input
												type="text"
												value={newUserId}
												onChange={(e) => setNewUserId(e.target.value)}
												placeholder="ID de l'utilisateur (ex: 13 pour Patrick)"
												className="w-full p-2 rounded-lg border border-gray-200"
											/>
											{newUserId === user.id.toString() && (
												<p className="text-red-500 text-sm">Vous ne pouvez pas vous envoyer un message à vous-même</p>
											)}
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
                        disabled={!newUserId || !newMessage || parseInt(newUserId) === user.id || isLoading}
                        className="w-full p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        Envoyer
                      </button>
										</div>
									)}
								</div>
	
								<div className="mt-4 flex-1 overflow-y-auto">
									<div className="space-y-2">
										{users.map((chatUser) => chatUser && (
											<button
												key={chatUser.id}
												onClick={() => handleUserSelection(chatUser.id)}
												className={`flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 cursor-pointer w-full transition-colors ${
													selectedUserId === chatUser.id ? 'bg-gray-100' : ''
												}`}
												disabled={isLoading}
												type="button"
											>
												<img
													src={chatUser.picture || "/default-avatar.png"}
													alt={chatUser.userName}
													className="w-8 h-8 rounded-full flex-shrink-0"
												/>
												<span className="bg-white px-4 py-1 rounded-full shadow-sm truncate">
													{chatUser.userName}
												</span>
											</button>
										))}
									</div>
								</div>
							</div>
						</div>
	
						<div className="flex-1 flex flex-col shadow-md border-y border-r border-gray-100 rounded-r-3xl bg-white">
							{error && (
								<div className="p-3 bg-red-50 text-red-600">
									{error}
								</div>
							)}
							
							<div className="flex-1 overflow-y-auto p-3 space-y-3">
								{selectedUserMessages.map((message) => (
									<div
										key={message.id}
										className={`flex ${
											message.sender_id === user.id ? "justify-end" : "justify-start"
										}`}
									>
										<div className="flex items-start space-x-2 max-w-md">
											{message.sender_id !== user.id && (
												<img
													src={message.sender.picture || "/default-avatar.png"}
													alt={message.sender.userName}
													className="w-8 h-8 rounded-full flex-shrink-0"
												/>
											)}
											<div>
												<div
													className={`text-sm text-gray-600 ${
														message.sender_id === user.id ? "text-right" : "text-left"
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
													src={user.picture || "/default-avatar.png"}
													alt="You"
													className="w-8 h-8 rounded-full flex-shrink-0"
												/>
											)}
										</div>
									</div>
								))}
							</div>
	
							<div className="p-3 bg-gray-100 flex-shrink-0">
								<div className="flex items-center space-x-2">
									<img
										src={user.picture || "/default-avatar.png"}
										alt="You"
										className="w-8 h-8 rounded-full flex-shrink-0"
									/>
									<div className="flex-1 flex items-center space-x-2 bg-white rounded-full border border-gray-200 pr-2">
										<input
											type="text"
											value={newMessage}
											onChange={(e) => setNewMessage(e.target.value)}
											placeholder={selectedUser ? "Envoyer un message..." : "Sélectionnez un utilisateur pour envoyer un message"}
											className="flex-1 p-2 rounded-full border-none focus:outline-none min-w-0"
											disabled={!selectedUser || isLoading}
											onKeyPress={(e) => {
												if (e.key === 'Enter' && selectedUser && !isLoading) {
													handleSendMessage();
												}
											}}
										/>
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!selectedUser || !newMessage.trim() || isLoading}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 flex-shrink-0"
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
