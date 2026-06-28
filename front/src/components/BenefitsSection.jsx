import React from 'react';
import benefitsImage from "../assets/benefits.jpg";
const BenefitsSection = () => {
  const benefits = [
    {
      icon: '🥦',
      title: 'Notre expertise en agriculture urbaine',
      description: 'Nous promouvons des solutions innovantes pour rapprocher les producteurs des consommateurs, même en milieu urbain.'
    },
    {
      icon: '🌽',
      title: 'Des solutions durables',
      description: 'Notre mission est de bâtir une agriculture plus résiliente, fondée sur la durabilité et la transparence.'
    },
    {
      icon: '🥕',
      title: 'Une approche centrée sur la communauté',
      description: 'Chez TerangaAgro, nous croyons au pouvoir du collectif. Nous connectons les producteurs, les consommateurs et les livreurs dans une relation de confiance et de proximité.'
    },
    {
      icon: '🥬',
      title: 'Un accès à des produits frais et de qualité',
      description: 'Grâce à notre plateforme, vous accédez facilement à des produits locaux, frais et tracés depuis leur origine.'
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${benefitsImage})`,
          filter: 'blur(1px)'
        }}
      />
      <div className="absolute inset-0 bg-green-900 bg-opacity-85" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
            Bon pour la planète, meilleur pour votre santé
          </h2>
          <p className="text-white text-lg leading-relaxed max-w-3xl mx-auto">
            Nos produits sont cultivés de manière responsable, dans le respect de la nature et des communautés locales.
          </p>
        </div>

        {/* Benefits Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-6">
                {/* Icon Circle */}
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-green-200">
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-xl mb-3 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;