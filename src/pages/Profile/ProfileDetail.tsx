import { useEffect, useState } from "react";
import type { IUser } from "../../@types";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../utils/axios";

function ProfileDetail() {
	const { id } = useParams<{ id: string }>();
	const [user, setUser] = useState<IUser | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await AxiosInstance.get<IUser>(`/users/${id}`);
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		fetchUser();
	}, [id]);

	if (!user) {
		return <div>Chargement...</div>;
	}

	return (
		<div className="max-w-4xl mx-auto p-4 pt-20">
			<h1 className="text-lg text-blue-600 mb-4">Mon profil</h1>
			<div className="bg-blue-50 rounded-lg p-8">
				<div className="flex flex-col md:flex-row gap-12">
					<div className="w-full md:w-2/5">
						<div className="rounded-lg overflow-hidden w-64 h-64 mx-auto md:mx-0">
							<img
								src={user.picture || "/api/placeholder/300/300"}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						</div>

						<div className="flex gap-3 mt-6 justify-center md:justify-start">
							{user.tags?.map((tag) => (
								<span
									key={tag.name}
									className="px-4 py-1.5 bg-purple-600 text-white text-sm rounded-full"
								>
									{tag.name}
								</span>
							))}
						</div>
					</div>

					<div className="w-full md:w-3/5">
						<h2 className="text-2xl font-medium mb-2">
							{user.userName} ({user.gender === "H" ? "Homme" : "Femme"})
						</h2>
						<p className="text-gray-600 text-sm mb-6">
							{user.age} ans, {user.hometown}
						</p>

						<h3 className="font-medium text-lg mb-3">À propos de moi</h3>
						<p className="text-gray-700 leading-relaxed text-lg">
							{user.bio || "Pas de biographie fournie."}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileDetail;
