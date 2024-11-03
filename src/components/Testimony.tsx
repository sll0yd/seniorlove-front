import { useEffect, useState } from 'react';
import { ITestimony } from '../@types';

interface TestimonyProps {
  testimony: ITestimony;
}

function Testimony() {
  const [testimonies, setTestimonies] = useState<ITestimony[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du fichier JSON');
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.testimonies)) {
          console.log(data.testimonies);
          setTestimonies(data.testimonies);
        } else {
          console.error(
            'Les données JSON ne contiennent pas un tableau de témoignages',
          );
        }
      })
      .catch((error) =>
        console.error('Erreur lors du chargement des témoignages :', error),
      );
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: "url('/images/coupletestimony.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Témoignages
        </h2>

        <div className="flex justify-between max-w-6xl mx-auto px-12 gap-8">
          {testimonies.map((testimony) => (
            <div
              key={testimony.id}
              className="bg-white p-6 rounded-lg shadow-lg h-[500px] flex flex-col w-[300px]"
            >
              <h3 className="font-bold mb-2">{testimony.content}</h3>
              <p className="text-sm text-gray-600 mb-4">{testimony.user_id}</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <p className="font-medium">Reviewer name</p>
                  <p className="text-sm text-gray-500">12 Septembre</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 flex-grow">
                Contrary to popular belief, Lorem ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimony;
