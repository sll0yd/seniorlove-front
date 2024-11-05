import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
		<div className="min-h-screen bg-gray-100 pt-24">
			<div className="relative mb-12">
				<div className="absolute bg-blue-50 h-full w-[300px] left-0 rounded-r-3xl" />
				<div className="relative max-w-[300px]">
					<h1 className="text-2xl font-bold py-4 text-center px-8">
						Liste des profils
					</h1>
				</div>
			</div>

			<div className="max-w-6xl mx-auto px-8">
				<div className="mb-8">
					<input
						type="text"
						placeholder="Recherchez des profils..."
						className="w-full p-3 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
					/>
				</div>

				<div className="space-y-4">
					{profiles.map((profile) => (
						<div
							key={profile.id}
							className="bg-blue-50 rounded-lg p-6 flex items-center"
						>
							<div className="flex-1 flex gap-6">
								<img
									src={profile.picture || "https://randomuser.me/api/portraits/men/1.jpg"}
									alt="Avatar"
									className="w-24 h-24 object-cover rounded-lg"
								/>
								<div className="flex-1">
									<div className="font-semibold mb-1">{profile.userName}</div>
									<div className="text-sm text-gray-600 mb-2">
										{profile.age} ans, {profile.hometown}
									</div>
									<div className="text-gray-700">{profile.bio}</div>
								</div>
							</div>
							<Link
								to={`/profile/${profile.id}`}
								className="ml-4 px-6 py-1.5 border border-red-400 text-red-400 rounded-full text-sm hover:bg-red-50 transition-colors whitespace-nowrap self-center"
							>
								Voir le Profil
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProfilesLists;
