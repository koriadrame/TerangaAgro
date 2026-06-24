import { useState } from 'react';
import realisation1 from "../assets/local1.jpg";
import realisation2 from "../assets/local2.jpg";
import realisation3 from "../assets/local3.jpg";
import realisation4 from "../assets/local4.jpg";
const LocalAchievements = () => {
  const achievements = [
    {
      id: 1,
      title: 'Jardin de légumes de Fatou',
      description: 'Production bio et variée, livrée directement aux consommateurs.',
      image: realisation1
    },
    {
      id: 2,
      title: 'Ferme de Mamadou',
      description: 'Fruits frais et de saison, issus d\'une agriculture durable.',
      image: realisation2
    },
    {
      id: 3,
      title: 'Coopérative de Thiès',
      description: 'Production à grande échelle avec des pratiques durables.',
      image: realisation3
    },
    {
      id: 4,
      title: 'Serre de Kolda',
      description: 'Culture hydroponique moderne avec un rendement optimal.',
      image: realisation4
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Commence par les deux premiers éléments

  const next = () => {
    // Navigation continue : avance de 2 avec bouclage (0->2->0)
    setCurrentIndex((prev) => (prev + 2) % 4);
  };

  const prev = () => {
    // Navigation continue : recule de 2 avec bouclage (2->0->2)
    setCurrentIndex((prev) => (prev - 2 + 4) % 4);
  };

  return (
    <section className="pt-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl text-center font-script mb-12" style={{ color: '#2B6B44' }}>
          Nos réalisations locales
        </h2>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {achievements.slice(currentIndex, currentIndex + 2).map((achievement, index) => (
              <div key={achievement.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src={achievement.image} 
                  alt={achievement.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 text-xl mb-3">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Style circulaire vert */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-14 h-14 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-all duration-200 shadow-lg transform hover:scale-105 opacity-100 hover:opacity-90"
            style={{ backgroundColor: '#2B6B44' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-14 h-14 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-all duration-200 shadow-lg transform hover:scale-105 opacity-100 hover:opacity-90"
            style={{ backgroundColor: '#2B6B44' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots indicator - Navigation bipage */}
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentIndex(0)}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
              currentIndex === 0 ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ backgroundColor: '#2B6B44' }}
          />
          <button
            onClick={() => setCurrentIndex(2)}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
              currentIndex === 2 ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ backgroundColor: '#2B6B44' }}
          />
        </div>
      </div>
    </section>
  );
};

export default LocalAchievements;