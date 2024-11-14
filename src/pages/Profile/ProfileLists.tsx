import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { IUser } from "../../@types";
import AxiosInstance from "../../utils/axios";
import Fuse from "fuse.js";

function ProfilesLists() {
	const [profiles, setProfiles] = useState<IUser[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredProfiles, setFilteredProfiles] = useState<IUser[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await AxiosInstance.get<IUser[]>("/users");
				setProfiles(response.data);
				setFilteredProfiles(response.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, []);

	useEffect(() => {
		// Configure Fuse.js for fuzzy search on userName, bio, and hometown fields
		const fuse = new Fuse(profiles, {
			keys: ["userName", "bio", "hometown"],
			threshold: 0.3,
		});

		if (searchQuery.trim()) {
			const results = fuse.search(searchQuery).map((result) => result.item);
			setFilteredProfiles(results);
		} else {
			setFilteredProfiles(profiles); // Show all if no search query
		}
	}, [searchQuery, profiles]);

	const getDefaultProfilePicture = (gender: string) => {
		return gender === "F"
			? "https://avatar.iran.liara.run/public/52"
			: "https://avatar.iran.liara.run/public/45";
	};

	const getBackgroundColor = (gender: string) => {
		return gender === "F" ? "bg-pink-50" : "bg-blue-50";
	};

	return (
		<div className="min-h-screen  pt-24">
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
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Recherchez des profils..."
						className="w-full p-3 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
					/>
				</div>

				<div className="space-y-4">
					{filteredProfiles.map((profile) => (
						<div
							key={profile.id}
							className={`${getBackgroundColor(profile.gender)} rounded-lg p-6 flex items-center`}
						>
							<div className="flex-1 flex gap-6">
								<img
									src={
										profile.picture || getDefaultProfilePicture(profile.gender)
									}
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
			<div className="py-12">
				<div className="relative">
					<div className="absolute bg-pink-50 h-full right-[calc(50%-550px)] left-0 rounded-r-3xl" />
					<div className="relative max-w-[950px] mx-auto px-4 flex items-center justify-between">
						<p className="text-center text-sm flex-1 italic mr-4 py-4">
							Élargissez votre cercle et partez à la rencontre de nouvelles
							personnes prêtes à vivre des expériences enrichissantes !
						</p>
						<Link to="/events">
							<button
								type="button"
								className="px-8 py-3 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300"
							>
								Retour à la liste des évènements
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfilesLists;
