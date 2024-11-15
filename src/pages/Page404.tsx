import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 font-roboto">
      <div className="text-center p-8">
        <div className="relative w-64 h-64 mx-auto">
          <div className="heart animate-heartbeat">
            <div className="before:content-[''] before:absolute before:w-[120px] before:h-[180px] before:rounded-t-[60px] before:bg-custom-pink before:left-[120px] before:-rotate-45 before:origin-[0_100%]
                          after:content-[''] after:absolute after:w-[120px] after:h-[180px] after:rounded-t-[60px] after:bg-custom-pink after:left-0 after:rotate-45 after:origin-[100%_100%]">
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-custom-blue my-5">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Oups ! Cette page n'existe pas.<br/>Cette connexion n'était pas destinée à être.</p>
        <Link 
          to="/" 
          className="bg-custom-blue text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:bg-custom-pink hover:scale-105 inline-block"
        >
          Trouvez Votre Âme Sœur
        </Link>
      </div>
    </div>
  );
}

export default NotFound;