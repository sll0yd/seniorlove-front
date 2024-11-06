function ProfileEdit() {
	return (
		<main className="pt-24">
			<div className="relative mb-12">
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

					<div className="md:col-span-2 flex justify-center mb-12">
						<div className="w-40 h-40 rounded-lg overflow-hidden">
							<img
								src="https://randomuser.me/api/portraits/men/1.jpg"
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
									defaultValue="Harold (hidethepain)"
									className="w-full p-2 border rounded-md"
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
									defaultValue="Paris"
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
									className="w-full p-2 border rounded-md h-32"
									defaultValue="Rêveur romantique cherchant à transmettre à quelqu'un de personnel qui lui fera battre mon cœur. J'aime les balades au bord de l'eau, les couchers de soleil, et les longues discussions qui s'étirent jusqu'au petit matin. Ici pour construire quelque chose de vrai et durable."
								/>
							</div>

							<div>
								<label
									htmlFor="interests"
									className="block text-sm text-gray-600 mb-2"
								>
									Vos centres d'intérêt :
								</label>
								<div id="interests" className="flex flex-wrap gap-2">
									<span className="px-3 py-1 bg-purple-600 text-white rounded-full">
										Danse
									</span>
									<span className="px-3 py-1 bg-red-700 text-white rounded-full">
										Rencontre
									</span>
									<span className="px-3 py-1 bg-gray-600 text-white rounded-full">
										Sport
									</span>
									<button
										type="button"
										className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
									>
										+
									</button>
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
									defaultValue="******************"
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
									className="w-full p-2 border rounded-md"
								/>
							</div>

							<button
								type="button"
								className="px-4 py-2 bg-green-600 text-white rounded-md"
							>
								Mettre à jour
							</button>
						</div>
					</div>

					<div className="md:col-span-2 flex justify-center mt-12">
						<button
							type="button"
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
