import { useEffect, useState } from "react";
import type { IUser } from "../../@types";
import AxiosInstance from "../../utils/axios";

function ProfilesLists() {
	const [profiles, setProfiles] = useState<IUser[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await AxiosInstance.get<IUser[]>("/users");
				setProfiles(response.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 p-6 pt-20">
			<div className="max-w-2xl mx-auto">
				<div className="mb-6">
					<input
						type="text"
						placeholder="Recherchez des profils..."
						className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
					/>
				</div>

				<div className="text-lg font-medium mb-4">Liste des profils</div>

				<div className="space-y-4">
					{profiles.map((profile) => (
						<div
							key={profile.id}
							className="bg-blue-50 rounded-lg shadow-sm p-4 flex justify-between items-start"
						>
							<div className="flex gap-4">
								<img
									src={
										profile.picture ||
										"https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
									}
									alt="Avatar"
									className="w-16 h-16 object-cover flex-shrink-0"
								/>
								<div>
									<div className="text-sm text-gray-500 mb-1">
										{profile.userName}
									</div>
									<div className="text-sm text-gray-500 mb-2">
										{profile.age} ans, habite {profile.hometown}
									</div>
									<div className="text-sm">{profile.bio}</div>
								</div>
							</div>
							<button
								type="button"
								className="bg-white text-pink-500 px-4 py-1 rounded border border-pink-500 text-sm hover:bg-pink-50 whitespace-nowrap"
							>
								Voir le Profil
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProfilesLists;
