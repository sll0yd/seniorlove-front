import { useEffect, useState } from 'react';
import type { ITestimony } from '../@types';
import AxiosInstance from '../utils/axios';

function Testimony() {
  const [testimonies, setTestimonies] = useState<ITestimony[]>([]);
  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const response = await AxiosInstance.get<ITestimony[]>('/testimonies');
        setTestimonies(response.data.slice(0, 3)); // Display only the first 3 testimonies with
        console.log('Testimonies:', response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching testimonies:', error);
      }
    };
    fetchTestimonies();
  }, []);

  return (
    <div
      id="testimony"
      className="relative min-h-screen"
      style={{
        backgroundImage: "url('/images/coupletestimony.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative px-4 py-8 md:p-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-16">
          Témoignages
        </h2>

        {/* Container for testimonials */}
        <div className="max-w-7xl mx-auto px-2 md:px-8">
          {/* Grid container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {testimonies.map((testimony) => (
              <div
                key={testimony.id}
                className="bg-white p-6 md:p-10 rounded-lg shadow-lg flex flex-col min-h-[250px] md:min-h-[600px] lg:min-h-[650px]"
              >
                <h3 className="font-bold text-lg md:text-xl mb-4 md:mb-6 line-clamp-2">
                  {testimony.content}
                </h3>
                {/* Reviewer info */}
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  {testimony.user.picture ? (
                    <img
                      src={testimony.user.picture}
                      alt="UserPicture"
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-200 flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-base md:text-lg truncate">
                      {testimony.user.userName}
                    </p>
                    <p className="text-sm md:text-base text-gray-500">
                      {new Date(testimony.created_at).toLocaleDateString(
                        'fr-FR',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </p>
                  </div>
                </div>
                {/* Review text */}
                <div className="flex-grow">
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {testimony.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimony;
