import { useEffect, useState } from "react";
import AxiosInstance from "../../utils/axios";
import type { IUser, ITag } from "../../@types";
import { useTags } from "../../context/TagContext";

function ProfileEdit() {
	const [user, setUser] = useState<IUser | null>(null);
	const [userName, setUserName] = useState("");
	const [age, setAge] = useState("");
	const [hometown, setHometown] = useState("");
	const [bio, setBio] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
	const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
	const { tags } = useTags();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await AxiosInstance.get<IUser>("/me");
				setUser(response.data);
				setUserName(response.data.userName || "");
				setAge(response.data.age?.toString() || "");
				setHometown(response.data.hometown || "");
				setBio(response.data.bio || "");
				setSelectedTags(response.data.tags || []);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};
		fetchProfile();
	}, []);

	const handleSave = async () => {
		try {
			const updatedUser = {
				userName,
				age,
				hometown,
				bio,
				password: newPassword || password,
				tags: selectedTags,
			};
			await AxiosInstance.patch("/me", updatedUser);
			alert("Informations mises à jour avec succès");
		} catch (error) {
			console.error("Erreur lors de la mise à jour:", error);
			alert("Une erreur s'est produite");
		}
	};

	const handleAddTag = (tag: ITag) => {
		if (!selectedTags.find((t) => t.id === tag.id)) {
			setSelectedTags([...selectedTags, tag]);
		}
		setIsTagDropdownOpen(false);
	};

	const handleRemoveTag = (tagId: number) => {
		setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
	};

	if (!user) {
		return <div>Chargement...</div>;
	}

	return (
		<main className="pt-24">
			<div className="relative mb-4">
				<div className="absolute bg-blue-50 h-full w-[300px] left-0 rounded-r-3xl" />
				<div className="relative max-w-[300px]">
					<h1 className="text-2xl font-bold py-4 text-center px-8">
						Mon compte
					</h1>
				</div>
			</div>

			<div className="max-w-6xl mx-auto px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
					<div className="hidden md:block absolute top-[240px] h-[400px] left-1/2 w-px bg-gray-200 opacity-50" />

					<div className="md:col-span-2 flex justify-center mb-6">
						<div className="w-40 h-40 rounded-lg overflow-hidden">
							<img
								src={
									user.picture ||
									"https://randomuser.me/api/portraits/men/1.jpg"
								}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>

					<div className="space-y-6 md:pr-12">
						<h2 className="text-xl font-semibold">
							VOS INFORMATIONS PUBLIQUES
						</h2>

						<div className="space-y-6">
							<div>
								<label
									htmlFor="username"
									className="block text-sm text-gray-600 mb-2"
								>
									Nom (ou pseudonyme) :
								</label>
								<input
									id="username"
									type="text"
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
									className="w-full p-2 border rounded-md"
								/>
							</div>

							<div>
								<label
									htmlFor="age"
									className="block text-sm text-gray-600 mb-2"
								>
									Age :
								</label>
								<input
									id="age"
									type="text"
									value={age}
									onChange={(e) => setAge(e.target.value)}
									className="w-full p-2 border rounded-md"
									min="60"
									max="120"
								/>
							</div>

							<div>
								<label
									htmlFor="location"
									className="block text-sm text-gray-600 mb-2"
								>
									Localisation :
								</label>
								<input
									id="location"
									type="text"
									value={hometown}
									onChange={(e) => setHometown(e.target.value)}
									className="w-full p-2 border rounded-md"
								/>
							</div>

							<div>
								<label
									htmlFor="bio"
									className="block text-sm text-gray-600 mb-2"
								>
									Votre bio :
								</label>
								<textarea
									id="bio"
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									className="w-full p-2 border rounded-md h-32"
								/>
							</div>

							<div className="relative">
								<label
									htmlFor="interests"
									className="block text-sm text-gray-600 mb-2"
								>
									Vos centres d'intérêt :
								</label>
								<div id="interests" className="flex flex-wrap gap-3">
									<div className="flex flex-wrap gap-2 items-center">
										{selectedTags && selectedTags.length > 0 ? (
											selectedTags.map((tag) => (
												<span
													key={tag.id}
													style={{
														backgroundColor: `#${tag.color}`,
													}}
													className="inline-flex items-center justify-center gap-1 text-sm px-3 py-1.5 rounded-full text-white"
												>
													<span className="leading-none flex items-center">
														{tag.name}
													</span>
													<button
														type="button"
														onClick={() => handleRemoveTag(tag.id)}
														className="ml-1 rounded-full hover:bg-white/20 transition-colors w-4 h-4 flex items-center justify-center leading-none text-lg"
														aria-label="Remove tag"
													>
														×
													</button>
												</span>
											))
										) : (
											<p className="text-gray-500 italic text-sm">
												Aucun tag associé à ce profil
											</p>
										)}
									</div>
									<div className="relative">
										<button
											type="button"
											className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
											onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
										>
											<span className="text-gray-600 text-lg">+</span>
										</button>
										{isTagDropdownOpen && (
											<div className="absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
												<div className="py-1 max-h-64 overflow-y-auto">
													{tags.map((tag) => (
														<button
															type="button"
															key={tag.id}
															className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 group"
															onClick={() => handleAddTag(tag)}
														>
															<span
																className="inline-block w-3 h-3 rounded-full transition-transform group-hover:scale-110"
																style={{ backgroundColor: `#${tag.color}` }}
															/>
															<span className="text-gray-700">{tag.name}</span>
														</button>
													))}
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-6 md:pl-12">
						<h2 className="text-xl font-semibold">VOS INFORMATIONS PRIVÉES</h2>

						<div className="space-y-6">
							<div>
								<label
									htmlFor="current-password"
									className="block text-sm text-gray-600 mb-2"
								>
									Mot de passe actuel :
								</label>
								<input
									id="current-password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full p-2 border rounded-md"
								/>
							</div>

							<div>
								<label
									htmlFor="new-password"
									className="block text-sm text-gray-600 mb-2"
								>
									Nouveau mot de passe :
								</label>
								<input
									id="new-password"
									type="password"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									className="w-full p-2 border rounded-md"
								/>
							</div>

							<button
								type="button"
								className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
								onClick={handleSave}
							>
								Mettre à jour
							</button>
						</div>
					</div>

					<div className="md:col-span-2 flex justify-center mt-12">
						<button
							type="button"
							onClick={handleSave}
							className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
						>
							Sauvegarder
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}

export default ProfileEdit;
