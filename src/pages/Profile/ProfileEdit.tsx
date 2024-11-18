import { useEffect, useState } from "react";
import AxiosInstance from "../../utils/axios";
import type { ITag, IUser } from "../../@types";
import { useTags } from "../../context/TagContext";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";

function ProfileEdit() {
	// Récupération du user et setUser depuis le context utilisateur
	const { user, setUser } = useUser();

	// États pour gérer les champs du formulaire
	const [userName, setUserName] = useState("");
	const [age, setAge] = useState("");
	const [hometown, setHometown] = useState("");
	const [bio, setBio] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	// Etats pour gérer l'image
	const [picture, setPicture] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	// États pour gérer les tags (centres d'intérêt)
	const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
	const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
	const [isUpdatingTags, setIsUpdatingTags] = useState(false);
	const { tags } = useTags(); // Récupération de tous les tags disponibles

	// Init of the user data and refresh the user data when changes is applied
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await AxiosInstance.get<IUser>("/me");
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching tags:", error);
			}
		};
		fetchUser();
	}, []);

	// Initialisation des champs avec les données du user
	useEffect(() => {
		if (user) {
			setUserName(user.userName || "");
			setAge(user.age?.toString() || "");
			setHometown(user.hometown || "");
			setBio(user.bio || "");

			// Traitement des tags de l'utilisateur
			if (user.tags && Array.isArray(user.tags)) {
				const formattedTags = user.tags.map((userTag) => {
					const fullTag = tags.find((t) => t.id === userTag.id);
					return {
						...userTag,
						color: fullTag?.color || "",
					};
				});
				setSelectedTags(formattedTags);
			}
		}
	}, [user?.tags, user, tags]);

	// Mise à jour du profil avec mise à jour du context
	const handleSave = async () => {
		try {
			const updatedUser = {
				userName,
				age,
				hometown,
				bio,
				password: newPassword || password,
			};
			const response = await AxiosInstance.patch("/me", updatedUser);
			setUser(response.data); // Met à jour le context utilisateur
			alert("Informations mises à jour avec succès");
		} catch (error) {
			console.error("Erreur lors de la mise à jour:", error);
			alert("Une erreur s'est produite");
		}
	};

	// Ajout d'un nouveau tag au profil
	const handleAddTag = async (tag: ITag) => {
		if (selectedTags.find((t) => t.id === tag.id)) {
			return; // Évite les doublons
		}

		setIsUpdatingTags(true);
		try {
			await AxiosInstance.post(`/me/tags/${tag.id}`);
			const updatedTags = [...selectedTags, tag];
			setSelectedTags(updatedTags);
			// Mise à jour du user context avec les nouveaux tags
			if (user) {
				setUser({
					...user,
					tags: updatedTags,
				});
			}
			setIsTagDropdownOpen(false);
		} catch (error) {
			console.error("Error adding tag:", error);
			alert("Une erreur s'est produite lors de l'ajout du tag");
		} finally {
			setIsUpdatingTags(false);
		}
	};

	// Suppression d'un tag du profil
	const handleRemoveTag = async (tagId: number) => {
		setIsUpdatingTags(true);
		try {
			await AxiosInstance.delete(`/me/tags/${tagId}`);
			const updatedTags = selectedTags.filter((tag) => tag.id !== tagId);
			setSelectedTags(updatedTags);
			// Mise à jour du user context avec les tags mis à jour
			if (user) {
				setUser({
					...user,
					tags: updatedTags,
				});
			}
		} catch (error) {
			console.error("Error removing tag:", error);
			alert("Une erreur s'est produite lors de la suppression du tag");
		} finally {
			setIsUpdatingTags(false);
		}
	};

	// Gestion de l'aperçu de l'image
	useEffect(() => {
		if (picture) {
			const objectUrl = URL.createObjectURL(picture);
			setPreview(objectUrl);
		} else {
			setPreview(null);
		}
	}, [picture]);

	// Gestion du changement d'image
	const handlePictureChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setPicture(file);
		const formData = new FormData();
		formData.append("picture", file);

		try {
			await AxiosInstance.post("/me/profile_picture", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			const response = await AxiosInstance.get<IUser>("/me");
			setUser(response.data); // Met à jour le context utilisateur
			alert("Image de profil mise à jour avec succès");
		} catch (error) {
			console.error("Error updating picture:", error);
		}
	};

	// Affichage d'un message de chargement si l'utilisateur n'est pas encore chargé
	if (!user) {
		return <div>Chargement...</div>;
	}

  const getDefaultProfilePicture = (gender:string) => {
    if (gender === 'F') {
        return 'https://avatar.iran.liara.run/public/52';
    }
    return 'https://avatar.iran.liara.run/public/45';
};

	return (
		<main className="pt-24" key={user.id}>
			{/* En-tête de la page */}
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
					{/* Ligne de séparation verticale */}
					<div className="hidden md:block absolute top-[320px] h-[300px] left-1/2 w-px bg-gray-200 opacity-50 " />

					{/* Image de profil */}

					{/* Section de l'image de profil et du formulaire pour télécharger une image */}
					<div className="md:col-span-2 flex flex-col items-center mb-6">
						{/* Image de profil */}
						<div className="w-full max-w-[200px] h-[200px] bg-gray-200 rounded-lg overflow-hidden m-5">
							<img
								src={user.picture || getDefaultProfilePicture(user.gender)}
								alt={user?.userName}
								className="w-full h-full object-cover"
							/>
						</div>

						{/* Formulaire pour télécharger une image */}
						<form action="/uploads" method="POST" className="mt-2">
							<label
								htmlFor="upload-picture"
								className="px-4 py-2 bg-gray-800 text-white rounded-lg cursor-pointer block text-center"
							>
								Choisissez une photo de couverture
							</label>
							<input
								type="file"
								accept="image/*"
								onChange={handlePictureChange}
								className="hidden"
								id="upload-picture"
							/>
						</form>
					</div>

					{/* Colonne des informations publiques */}
					<div className="space-y-4 md:pr-12">
						<h2 className="text-xl font-semibold">
							VOS INFORMATIONS PUBLIQUES
						</h2>

						<div className="space-y-4">
							{/* Nom d'utilisateur */}
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

							{/* Âge */}
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

							{/* Localisation */}
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

							{/* Biographie */}
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

							{/* Section des tags */}
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
														disabled={isUpdatingTags}
														className={`ml-1 rounded-full hover:bg-white/20 transition-colors w-4 h-4 flex items-center justify-center leading-none text-lg ${
															isUpdatingTags
																? "opacity-50 cursor-not-allowed"
																: ""
														}`}
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

									{/* Menu déroulant des tags */}
									<div className="relative">
										<button
											type="button"
											className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors ${
												isUpdatingTags ? "opacity-50 cursor-not-allowed" : ""
											}`}
											onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
											disabled={isUpdatingTags}
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
															className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 group ${
																isUpdatingTags
																	? "opacity-50 cursor-not-allowed"
																	: ""
															}`}
															onClick={() => handleAddTag(tag)}
															disabled={isUpdatingTags}
														>
															<span
																className="inline-block w-3 h-3 rounded-full transition-transform group-hover:scale-110"
																style={{
																	backgroundColor: `#${tag.color}`,
																}}
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

					{/* Colonne des informations privées */}
					<div className="space-y-4 md:pl-12">
						<h2 className="text-xl font-semibold">VOS INFORMATIONS PRIVÉES</h2>

						<div className="space-y-4">
							{/* Mot de passe actuel */}
							<div>
								<label
									htmlFor="current-password"
									className="block text-sm text-gray-600 mb-2"
								>
									Adresse email de connexion :
								</label>
								<input
									id="current-email"
									type="text"
									value={user.email}
									disabled
									className="w-full p-2 border rounded-md"
								/>
								<p className="text-sm text-gray-500 mt-1 italic">Ces informations ne sont pas communiquées ni partagées aux autres utilisateurs.</p>
							</div>

							{/* Nouveau mot de passe */}
							{/* <div>
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
							</div> */}

							{/* Bouton de mise à jour */}
							{/* <button
								type="button"
								className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
								onClick={handleSave}
							>
								Mettre à jour
							</button> */}
						</div>
					</div>

					{/* Bouton de sauvegarde général */}
					<div className="md:col-span-2 flex justify-center mt-6">
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

			<div className="py-12">
				<div className="relative">
					<div className="absolute bg-blue-50 h-full right-[calc(50%-550px)] left-0 rounded-r-3xl" />
					<div className="relative max-w-[950px] mx-auto px-4 flex items-center justify-between p-5">
						<p className="text-center text-lg flex-1 italic mr-4 py-4">
							Présentez-vous sous votre meilleur profile !
						</p>
						<Link to="/profile">
							<button
								type="button"
								className="px-8 py-3 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300"
							>
								Retour à la liste des profils
							</button>
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}

export default ProfileEdit;
