import { useState, useEffect } from "react";
import AxiosInstance from "../../utils/axios";
import type { IMessage, IUser } from "../../@types";
import { useUser } from "../../context/UserContext";

function Messages() {
	const { user } = useUser();
 
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [users, setUsers] = useState<IUser[]>([]);
	const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
	const [newMessage, setNewMessage] = useState("");

	// Récupérer les utilisateurs pour la barre latérale
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await AxiosInstance.get("/users");
				setUsers(response.data);
			} catch (error) {
				console.error("Failed to fetch users:", error);
			}
		};
		fetchUsers();
	}, []);

	// Récupérer les messages entre l'utilisateur actuel et l'utilisateur sélectionné lorsque selectedUser change
	useEffect(() => {
		const fetchMessages = async () => {
			if (!selectedUser || !user) return;
			try {
				const response = await AxiosInstance.get(
					`/messages/${user.id}/${selectedUser.id}`,
				);
				setMessages(response.data);
			} catch (error) {
				console.error("Failed to fetch messages:", error);
			}
		};
		fetchMessages();
	}, [selectedUser, user]);

	// Envoi de message
	const handleSendMessage = async () => {
		if (!newMessage || !selectedUser || !user) return;

		const messageData = {
			sender_id: user.id,
			receiver_id: selectedUser.id,
			content: newMessage,
		};

		try {
			const response = await AxiosInstance.post("/messages", messageData);
			setMessages((prevMessages) => [...prevMessages, response.data]);
			setNewMessage("");
		} catch (error) {
			console.error("Failed to send message:", error);
		}
	};

	// Séléctionner un utilisateur pour afficher les messages
	const handleUserSelection = (user: IUser) => {
		setSelectedUser(user);
		setMessages([]); // Effacer les messages précédents
	};

	return (
		<main className="pt-16">
			<div className="flex flex-col h-[calc(100vh-6rem)]">
				<div className="h-14 my-4">
					<div className="bg-blue-50 h-full w-[300px] rounded-r-3xl flex items-center justify-center shadow-sm">
						<h1 className="text-2xl font-bold">Messagerie</h1>
					</div>
				</div>

				<div className="flex flex-1 mx-10">
					{/* Rest of the component */}
					{/* Left sidebar */}
					<div className="w-64 p-4 bg-pink-50 rounded-l-3xl shadow-md">
						<div className="mb-4">
							<input
								type="button"
								placeholder="Recherche..."
								className="w-full p-2 rounded-lg border border-gray-200"
							/>
						</div>

						<div className="space-y-2">
							{users.map((user) => (
								<button
									key={user.id}
									onClick={() => handleUserSelection(user)}
									className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 cursor-pointer w-full transition-colors"
									type="button"
								>
									<img
										src={user.picture || "/default-avatar.png"}
										alt={user.userName}
										className="w-8 h-8 rounded-full"
									/>
									<span className="bg-white px-4 py-1 rounded-full shadow-sm">
										{user.userName}
									</span>
								</button>
							))}
						</div>
					</div>

					<div className="flex-1 flex flex-col shadow-md border-y border-r border-gray-100 rounded-r-3xl">
						{/* Messages */}
						<div className="flex-1 overflow-y-auto p-3 space-y-3">
							{messages.map((message) => (
								<div
									key={message.id}
									className={`flex ${
										message.sender_id === user?.id
											? "justify-end"
											: "justify-start"
									}`}
								>
									<div className="flex items-start space-x-2 max-w-md">
										{message.sender_id !== user?.id && (
											<img
												src={selectedUser?.picture || "/default-avatar.png"}
												alt={selectedUser?.userName}
												className="w-8 h-8 rounded-full"
											/>
										)}
										<div>
											<div
												className={`text-sm text-gray-600 ${
													message.sender_id === user?.id
														? "text-right"
														: "text-left"
												}`}
											>
												{message.sender_id === user?.id
													? "Vous"
													: selectedUser?.userName}
											</div>
											<div className="mt-1 p-2.5 rounded-lg shadow-sm bg-gray-50 text-gray-900">
												{message.content}
											</div>
										</div>
										{message.sender_id === user?.id && (
											<img
												src={user.picture || "/default-avatar.png"}
												alt="You"
												className="w-8 h-8 rounded-full"
											/>
										)}
									</div>
								</div>
							))}
						</div>

						{/* Message input */}
						<div className="p-3 bg-gray-100">
							<div className="flex items-center space-x-2">
								<img
									src={user?.picture || "/default-avatar.png"}
									alt="You"
									className="w-8 h-8 rounded-full"
								/>
								<div className="flex-1 flex items-center space-x-2 bg-white rounded-full border border-gray-200 pr-2">
									<input
										type="text"
										value={newMessage}
										onChange={(e) => setNewMessage(e.target.value)}
										placeholder="Envoyer un message..."
										className="flex-1 p-2 rounded-full border-none focus:outline-none"
										disabled={!selectedUser}
									/>
									<button
										type="button"
										onClick={handleSendMessage}
										disabled={!selectedUser}
										className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
