function DiscoverSeniorLove() {
  return (
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
   
  );
}

export default DiscoverSeniorLove;

