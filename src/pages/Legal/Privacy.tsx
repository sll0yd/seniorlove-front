function PrivacyPolicy() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<div
				className="bg-white shadow-lg rounded-lg p-8"
				style={{ marginTop: "4.5rem" }}
			>
				<h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
					Politique de Confidentialité de Senior Love
				</h1>

				<div className="mb-8 p-4 bg-blue-50 rounded-lg">
					<p className="text-lg font-semibold">
						Protection de vos données personnelles
					</p>
					<p>
						Chez Senior Love, la protection de votre vie privée est notre
						priorité. Voici comment nous traitons vos données.
					</p>
				</div>

				<p className="text-sm text-gray-600 mb-6">
					Dernière mise à jour : 25.09.2024
				</p>

				<div className="prose max-w-none space-y-8">
					<section>
						<h2 className="text-xl font-semibold mb-4">
							1. Collecte des données
						</h2>
						<p>
							Nous collectons uniquement les données nécessaires à votre
							utilisation du service :
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								Informations de profil (âge, situation, centres d'intérêt)
							</li>
							<li>Photos de profil</li>
							<li>Adresse email</li>
							<li>Préférences de recherche</li>
							<li>Messages échangés avec d'autres membres</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">
							2. Utilisation des données
						</h2>
						<p>Vos données sont utilisées pour :</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>Créer et gérer votre compte</li>
							<li>Vous mettre en relation avec d'autres membres</li>
							<li>Assurer la sécurité du service</li>
							<li>Améliorer nos services</li>
							<li>Vous contacter si nécessaire</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">
							3. Protection des données
						</h2>
						<p>
							Nous mettons en œuvre des mesures de sécurité pour protéger vos
							données :
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>Cryptage des données sensibles</li>
							<li>Accès restreint aux données personnelles</li>
							<li>Surveillance constante de notre système</li>
							<li>Protocoles de sécurité renforcés</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">4. Vos droits</h2>
						<p>Conformément au RGPD, vous disposez des droits suivants :</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>Droit d'accès à vos données</li>
							<li>Droit de rectification</li>
							<li>Droit à l'effacement (droit à l'oubli)</li>
							<li>Droit à la portabilité des données</li>
							<li>Droit d'opposition</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">
							5. Conservation des données
						</h2>
						<p>
							5.1 Vos données sont conservées tant que votre compte est actif.
						</p>
						<p>
							5.2 Après suppression du compte, vos données sont effacées sous 30
							jours.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">
							6. Cookies et traceurs
						</h2>
						<p>Nous utilisons des cookies essentiels pour :</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>Maintenir votre session active</li>
							<li>Mémoriser vos préférences</li>
							<li>Assurer la sécurité du site</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">
							7. Partage des données
						</h2>
						<p>7.1 Nous ne vendons jamais vos données personnelles.</p>
						<p>
							7.2 Vos données ne sont partagées qu'avec votre consentement
							explicite.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">
							8. Sécurité des seniors
						</h2>
						<p>8.1 Protection renforcée contre les tentatives d'arnaque.</p>
						<p>8.2 Vérification stricte des profils.</p>
						<p>8.3 Conseils de sécurité réguliers.</p>
					</section>

					<div className="mt-8 p-4 bg-gray-50 rounded-lg">
						<h2 className="text-xl font-semibold mb-4">Contact DPO</h2>
						<p>Pour toute question concernant vos données personnelles :</p>
						<p>Email : dpo@seniorlove.fr</p>
						<p>HAPPY RETIRED</p>
						<p>[Adresse complète à ajouter]</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PrivacyPolicy;
