function Header() {
	return (
		<header>
			<div className="relative w-full min-h-[600px]">
				<div className="absolute inset-0">
					<img src="/images/coupleheureux.JPG" alt="Couple heureux" className="w-full h-full object-cover"/>
				</div>

				<div className="relative w-full h-full flex items-center">
					<div className="ml-8 md:ml-16 w-full max-w-sm">
						<div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
							<h2 className="text-2xl font-bold text-center mb-6">INSCRIVEZ-VOUS</h2>
							<form className="space-y-4">
								<div>
									<p className="mb-2">Je suis</p>
									<div className="flex gap-4">
										<label className="flex items-center gap-2">
											<input
												type="radio"
												name="gender"
												value="femme"
												className="w-4 h-4"
											/>
											<span>Femme</span>
										</label>
										<label className="flex items-center gap-2">
											<input
												type="radio"
												name="gender"
												value="homme"
												className="w-4 h-4"
											/>
											<span>Homme</span>
										</label>
									</div>
								</div>

								<div>
									<label className="block mb-1 text-sm">Nom d'utilisateur</label>
									<input
										type="text"
										placeholder="votre nom d'utilisateur"
										className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								<div>
									<label className="block mb-1 text-sm">Année de naissance</label>
									<input
										type="text"
										placeholder="votre année de naissance"
										className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								<div>
									<label className="block mb-1 text-sm">Adresse email</label>
									<input
										type="email"
										placeholder="votre adresse email"
										className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								<div>
									<label className="block mb-1 text-sm">Choisissez un mot de passe</label>
									<input
										type="password"
										placeholder="mot de passe"
										className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								<button
									type="submit"
									className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-6"
								>
									M'INSCRIRE
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-6xl mx-auto px-4 py-12">
				<h1 className="text-4xl font-bold text-center mb-12">
					Découvrez Senior Love...
				</h1>
				<div className="grid md:grid-cols-2 gap-8 items-center mb-16">
					<div>
						<img
							src="/images/couplesavecverres.jpg"
							alt="couples avec verres"
							className="w-full h-auto rounded-lg object-cover"
						/>
					</div>

					<div className="space-y-6">
						<p className="text-lg leading-relaxed">
							Vous êtes dans l'âge d'or de la vie, une période pleine de
							liberté, de découvertes et de moments précieux à partager. Sur
							Senior Love, nous croyons que la beauté des relations ne fait que
							grandir avec le temps. Ici, les sexagénaires trouvent un espace
							chaleureux et accueillant, où l'amitié et l'amour prennent un
							nouveau souffle.
						</p>
						<p className="text-lg leading-relaxed">
							Que vous soyez à la recherche d'une complicité amicale, d'une
							romance ou d'un partenaire d'aventure, vous êtes au bon endroit.
						</p>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-8 items-center">
					<div className="space-y-8">
						<h2 className="text-2xl font-bold mb-6">Pourquoi nous choisir ?</h2>
						<div className="space-y-6">
							<div className="flex items-start gap-4">
								<span className="text-2xl">⭐</span>
								<p className="text-lg">
									Un espace bienveillant et sécurisé : Chaque profil est vérifié
									pour garantir des rencontres authentiques et en toute
									confiance.
								</p>
							</div>

							<div className="flex items-start gap-4">
								<span className="text-2xl">💭</span>
								<p className="text-lg">
									Des échanges simples et sincères : Avec notre messagerie
									conviviale, les conversations se lancent facilement, pour des
									moments de partage sans stress.
								</p>
							</div>

							<div className="flex items-start gap-4">
								<span className="text-2xl">📸</span>
								<p className="text-lg">
									Affichez vos passions : Partagez vos centres d'intérêt, vos
									passions et ce qui fait de vous une personne unique.
								</p>
							</div>
						</div>
					</div>

					<div>
						<img
							src="/images/coupleauski.png"
							alt="couples au ski"
							className="w-full h-auto rounded-lg object-cover"
						/>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
