import React, { useState } from 'react';
import blog1 from "../assets/contactac.jpg";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";
import blog4 from "../assets/blog4.jpg";

const BlogSection = () => {
  const articles = [
  {
    id: 1,
    title: 'Les bienfaits des légumes frais pour la santé des femmes',
    category: 'NUTRITION',
    author: 'ADMIN',
    date: '15 Juin 2026',
    excerpt: "Découvrez comment les légumes frais peuvent améliorer votre santé au quotidien. Riches en vitamines, minéraux et fibres, ils contribuent à renforcer le système immunitaire, prévenir certaines maladies et maintenir un poids santé. Intégrer une variété de légumes dans votre alimentation permet également de stimuler l'énergie et d'améliorer la digestion.",
    image: blog1
  },
  {
    id: 2,
    title: 'Comment choisir des produits de saison au Sénégal',
    category: 'CONSEILS',
    author: 'ADMIN',
    date: '12 Juin 2026',
    excerpt: "Un guide complet pour acheter les meilleurs produits selon les saisons. Apprenez à reconnaître les fruits et légumes les plus frais, à planifier vos menus en fonction des récoltes locales et à soutenir les agriculteurs sénégalais. Manger de saison permet aussi de réduire le gaspillage alimentaire et de profiter de saveurs optimales.",
    image: blog2
  },
  {
    id: 3,
    title: 'Recettes traditionnelles avec des ingrédients locaux',
    category: 'CUISINE',
    author: 'ADMIN',
    date: '10 Juin 2026',
    excerpt: "Redécouvrez les saveurs authentiques de notre terroir à travers ces recettes. Utilisez des ingrédients locaux pour préparer des plats typiques tout en valorisant la richesse culturelle et culinaire du Sénégal. Ces recettes simples et savoureuses permettent de cuisiner sainement et de partager un vrai moment de convivialité.",
    image: blog3
  },
  {
    id: 4,
    title: "L'agriculture urbaine, l'avenir de nos villes",
    category: 'TENDANCES',
    author: 'ADMIN',
    date: '08 Juin 2026',
    excerpt: "Comment l'agriculture urbaine transforme nos espaces et notre alimentation. Jardins sur les toits, potagers communautaires et fermes verticales permettent de produire localement, de réduire l'empreinte carbone et d'améliorer la qualité de vie en ville. Cette pratique favorise l'autosuffisance et crée des opportunités économiques et sociales.",
    image: blog4
  }
];

  // État pour savoir quels articles sont étendus
  const [expandedArticles, setExpandedArticles] = useState([]);

  const toggleReadMore = (id) => {
    if (expandedArticles.includes(id)) {
      setExpandedArticles(expandedArticles.filter(aid => aid !== id));
    } else {
      setExpandedArticles([...expandedArticles, id]);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-2">
        <h2 className="text-4xl md:text-5xl text-center font-script mb-12" style={{ color: '#2B6B44' }}>
          Derniers articles
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => {
            const isExpanded = expandedArticles.includes(article.id);

            return (
              <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-xs text-gray-400 mb-3">
                    {article.category} . {article.author} . {article.date}
                  </p>
                  <h3 className="font-bold text-gray-800 text-lg mb-3">
                    {article.title}
                  </h3>
                  <p className={`text-gray-600 text-sm mb-4 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                    {article.excerpt}
                  </p>
                  <button
                    className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                    onClick={() => toggleReadMore(article.id)}
                  >
                    {isExpanded ? 'Réduire ▲' : 'Continuer la lecture →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
