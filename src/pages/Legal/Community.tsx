import React from 'react';

function CommunityGuidelines() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8" style={{ marginTop: '4.5rem' }}>
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Règles de la Communauté Senior Love
        </h1>

        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-lg font-semibold">Notre engagement pour une communauté bienveillante</p>
          <p>Pour que Senior Love reste un espace sûr et agréable, nous vous demandons de respecter ces règles essentielles.</p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Respect et Bienveillance</h2>
            <div className="space-y-2">
              <p>Nous attendons de tous nos membres :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Un comportement courtois et respectueux</li>
                <li>Une communication bienveillante</li>
                <li>Le respect de la vie privée des autres membres</li>
                <li>La considération des différences d'opinion</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Authenticité</h2>
            <div className="space-y-2">
              <p>Sur Senior Love, vous devez :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utiliser votre vraie identité</li>
                <li>Avoir plus de 60 ans</li>
                <li>Publier des photos récentes et authentiques</li>
                <li>Fournir des informations véridiques</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Sécurité</h2>
            <div className="space-y-2">
              <p>Pour votre sécurité :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ne partagez pas vos informations bancaires</li>
                <li>Évitez de communiquer votre adresse personnelle</li>
                <li>Signalez les comportements suspects</li>
                <li>Rencontrez-vous dans des lieux publics</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Communication</h2>
            <div className="space-y-2">
              <p>Sont interdits :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Les messages agressifs ou menaçants</li>
                <li>Le harcèlement sous toute forme</li>
                <li>Les propos discriminatoires</li>
                <li>La diffusion de contenus inappropriés</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Photos et contenus</h2>
            <div className="space-y-2">
              <p>Vos photos doivent :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Vous représenter clairement</li>
                <li>Être récentes (moins de 2 ans)</li>
                <li>Respecter la décence</li>
                <li>Ne pas inclure d'autres personnes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Protection contre les arnaques</h2>
            <div className="space-y-2">
              <p>Signes d'alerte :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Demandes d'argent ou de cadeaux</li>
                <li>Histoires dramatiques pour susciter la pitié</li>
                <li>Refus systématique de rencontre en personne</li>
                <li>Profils trop beaux pour être vrais</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Rencontres en personne</h2>
            <div className="space-y-2">
              <p>Conseils de sécurité :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Privilégiez les lieux publics</li>
                <li>Informez un proche du lieu et de l'heure</li>
                <li>Gardez votre téléphone chargé</li>
                <li>Faites confiance à votre intuition</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. Modération</h2>
            <div className="space-y-2">
              <p>Nos actions en cas de non-respect :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Avertissement</li>
                <li>Suspension temporaire</li>
                <li>Suppression définitive du compte</li>
                <li>Signalement aux autorités si nécessaire</li>
              </ul>
            </div>
          </section>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Signalement</h2>
            <p>Pour signaler un comportement inapproprié :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Utilisez le bouton "Signaler" sur les profils</li>
              <li>Contactez la modération : moderation@seniorlove.fr</li>
              <li>En cas d'urgence : [Numéro d'urgence à ajouter]</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityGuidelines;