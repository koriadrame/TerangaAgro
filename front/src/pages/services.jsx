import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  GraduationCap, 
  Truck, 
  Users, 
  Shield, 
  Headphones,
  CheckCircle,
  ArrowRight,
  Star,
  Clock, 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import heroImage from "../assets/fservices.png";

const Services = ({ onOpenRegister, onOpenLogin }) => {
  // Données des services principaux
  const mainServices = [
    {
      id: 1,
      title: 'E-commerce Agricole',
      description: 'Vendez vos produits agricoles directement aux consommateurs avec notre plateforme sécurisée et intuitive.',
      icon: <ShoppingCart className="w-12 h-12" />,
      features: [
        'Catalogue en ligne personnalisé',
        'Paiement sécurisé',
        'Gestion des commandes',
        'Suivi des ventes'
      ],
      color: 'bg-green-500'
    },
    {
      id: 2,
      title: 'Formations & Accompagnement',
      description: 'Développez vos compétences agricoles avec nos formations certifiantes et notre accompagnement personnalisé.',
      icon: <GraduationCap className="w-12 h-12" />,
      features: [
        'Formations pratiques',
        'Mentorat d\'experts',
        'Certifications reconnues',
        'Mise à jour continue'
      ],
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Livraison & Distribution',
      description: 'Assurez une livraison rapide et fiable de vos produits grâce à notre réseau de distribution.',
      icon: <Truck className="w-12 h-12" />,
      features: [
        'Livraison express',
        'Réseau national',
        'Produits frais garantis',
        'Suivi en temps réel'
      ],
      color: 'bg-orange-500'
    }
  ];

  // Données des services complémentaires
  const additionalServices = [
    {
      id: 1,
      title: 'Communauté Agricole',
      description: 'Rejoignez une communauté active d\'agriculteurs et d\'experts pour échanger et apprendre.',
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 2,
      title: 'Sécurité & Traçabilité',
      description: 'Garantissez la qualité et la sécurité de vos produits avec notre système de traçabilité.',
      icon: <Shield className="w-8 h-8" />
    },
    {
      id: 3,
      title: 'Support Client 24/7',
      description: 'Notre équipe est disponible 24h/24 et 7j/7 pour vous accompagner dans vos démarches.',
      icon: <Headphones className="w-8 h-8" />
    }
  ];

  // Données des témoignages
  const testimonials = [
    {
      id: 1,
      name: 'Guedio Hamedi Camara',
      role: 'Producteur de légumes',
      content: 'Grâce à TerangaAgro, j\'ai multiplié mes ventes par 3 en 6 mois. La plateforme est simple et efficace.',
      rating: 5
    },
    {
      id: 2,
      name: 'Fatou Ba Diallo',
      role: 'Productrice',
      content: 'Les formations m\'ont permis d\'améliorer considérablement la santé de mes produits. Excellent support !',
      rating: 5
    },
    {
      id: 3,
      name: 'Mouhamadou Massamba Sarr',
      role: 'Agriculteur bio',
      content: 'La livraison est rapide et mes clients apprécient la fraîcheur des produits. Je recommande vivement !',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
        <Header onRegisterClick={onOpenRegister} onLoginClick={onOpenLogin} />
      {/* Hero Section */}
    <section className="w-full">
      <div className="container mx-auto max-w-7xl">
        
        {/* L'image fservices.jpg est définie ici comme fond complet du bloc */}
        <div 
          className="relative rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat min-h-[460px] md:h-[500px] flex items-center"
          style={{
            backgroundImage: `url('/src/assets/fservices.png')`
          }}
        >
          {/* Overlay ou conteneur pour positionner le texte sur la partie gauche */}
          <div className="w-full h-full px-8 sm:px-14 md:p-16  z-10">
            <div className="max-w-xl md:max-w-lg text-white space-y-6 md:space-y-8">
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Découvrez nos Services
              </h1>
              
              <p className="text-base sm:text-lg text-emerald-50/90 font-medium leading-relaxed max-w-sm">
                Découvrez l'ensemble de nos services conçus pour accompagner votre réussite agricole
              </p>
              
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-[#F2C035] hover:bg-[#E0B02A] text-gray-900 font-bold px-10 py-3 rounded-full shadow-md transition-all transform hover:scale-[1.02] text-sm"
                >
                  Contactez nous
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
      {/* Services Principaux */}
      <section className="pt-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services Principaux</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nous proposons une gamme complète de services pour répondre à tous vos besoins agricoles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 flex flex-col h-full">
                <div className={`${service.color} w-20 h-20 rounded-full flex items-center justify-center text-white mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="w-full inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mt-auto"
                  aria-label={`En savoir plus sur ${service.title}`}
                >
                  En savoir plus
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* Pourquoi choisir TerangaAgro ? */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-white to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-script mb-3 md:mb-6" style={{ color: '#2B6B44' }}>
                Pourquoi choisir TerangaAgro ?
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Une plateforme pensée pour moderniser l’agriculture locale et connecter directement tous les acteurs du secteur.
              </p>
            </div>

            {/* GRID PRINCIPAL */}
            {/* items-stretch force les 3 colonnes principales à avoir STRICTEMENT la même hauteur */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

              {/* Left - Stats cards */}
              {/* h-full et flex-col permettent de distribuer l'espace équitablement entre les cartes */}
              <div className="h-full flex flex-col gap-6">
                {[
                  { number: "100%", label: "Produits locaux" },
                  { number: "24h", label: "Livraison rapide" },
                  { number: "500+", label: "Producteurs connectés" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition flex-1 flex flex-col justify-center"
                  >
                    <h3 className="text-3xl font-bold text-[#2B6B44]">
                      {item.number}
                    </h3>
                    <p className="text-gray-600 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Center - Image principale */}
              {/* min-h-[400px] évite que l'image ne s'écrase sur les petits écrans mobiles */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl h-full min-h-[400px] lg:min-h-0">
                <img
                  src="/src/assets/agri1.jpg"
                  alt="Agriculture moderne"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
                  <p className="text-white text-lg font-semibold leading-snug">
                    Une agriculture plus connectée, plus juste et plus accessible
                  </p>
                </div>
              </div>

              {/* Right - Feature cards */}
              <div className="h-full flex flex-col gap-6">
                {[
                  {
                    title: "Connexion directe",
                    desc: "Producteurs et consommateurs sans intermédiaires."
                  },
                  {
                    title: "Qualité garantie",
                    desc: "Des produits frais issus de circuits locaux."
                  },
                  {
                    title: "Accompagnement",
                    desc: "Formations pour développer vos activités agricoles."
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:translate-x-1 transition flex-1 flex flex-col justify-center"
                  >
                    <h4 className="font-semibold text-[#2B6B44]">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      {/* Services Complémentaires */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Services Complémentaires</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Des services additionnels pour une expérience complète et réussie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service) => (
              <div key={service.id} className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-green-100 p-3 rounded-full text-green-600 flex-shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Section Produit Spécifique & Demande de Devis */}
        <section className="pb-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            
            {/* En-tête de la section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-script mb-3 md:mb-6" style={{ color: '#2B6B44' }}>
                Besoin d'un produit spécifique ?
              </h2>
              <p className="text-gray-700 text-sm md:text-base font-medium max-w-2xl mx-auto">
                Contactez-nous pour vos commandes spéciales, besoins en volume ou produits personnalisés.
              </p>
            </div>

            {/* Grille Principale : Image à gauche, Liste et Bouton à droite */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Colonne Gauche : Image illustrative avec bords arrondis */}
              <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-md">
                <img 
                  src="/src/assets/pdservices.jpg" 
                  alt="Productrice locale présentant des tomates fraîches" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Colonne Droite : Liste à puces stylisée & Appel à l'action */}
              <div className="space-y-4">
                
                {/* Élément 1 */}
                <div className="flex items-center gap-4 p-4 bg-white border border-emerald-800/20 rounded-xl transition-all hover:border-emerald-700/40">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white bg-[#008726]">
                    <CheckCircle className="w-5 h-5 fill-transparent stroke-[2.5]" />
                  </div>
                  <span className="text-gray-900 font-semibold text-sm md:text-base">
                    Produits agricoles sur mesure
                  </span>
                </div>

                {/* Élément 2 */}
                <div className="flex items-center gap-4 p-4 bg-white border border-emerald-800/20 rounded-xl transition-all hover:border-emerald-700/40">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white bg-[#008726]">
                    <CheckCircle className="w-5 h-5 fill-transparent stroke-[2.5]" />
                  </div>
                  <span className="text-gray-900 font-semibold text-sm md:text-base">
                    Commandes en gros revendeurs
                  </span>
                </div>

                {/* Élément 3 */}
                <div className="flex items-center gap-4 p-4 bg-white border border-emerald-800/20 rounded-xl transition-all hover:border-emerald-700/40">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white bg-[#008726]">
                    <CheckCircle className="w-5 h-5 fill-transparent stroke-[2.5]" />
                  </div>
                  <span className="text-gray-900 font-semibold text-sm md:text-base">
                    Devis rapide et gratuit
                  </span>
                </div>

                {/* Élément 4 */}
                <div className="flex items-center gap-4 p-4 bg-white border border-emerald-800/20 rounded-xl transition-all hover:border-emerald-700/40">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white bg-[#008726]">
                    <CheckCircle className="w-5 h-5 fill-transparent stroke-[2.5]" />
                  </div>
                  <span className="text-gray-900 font-semibold text-sm md:text-base">
                    Livraison adaptée à vos besoins
                  </span>
                </div>

                {/* Bouton de Demande de Devis */}
                <div className="pt-4">
                  <Link
                    to="/contact?type=devis"
                    className="w-full inline-flex items-center justify-center text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5 text-center"
                    style={{ backgroundColor: '#16A34A' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1B4D22'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16A34A'}
                  >
                    Demander un devis
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </section>

      {/* Témoignages */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez les témoignages de nos utilisateurs satisfaits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Section de Réassurance / Avantages Client */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
              
              {/* Colonne 1 : Livraison */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-50 text-[#1B4D22] flex items-center justify-center mb-4 shadow-sm">
                  <Clock className="w-7 h-7 stroke-[2]" />
                </div>
                <h3 className="text-gray-900 font-extrabold text-base mb-1 tracking-tight">
                  Livraison ultra-rapide
                </h3>
                <p className="text-gray-500 text-sm">
                  2h maximum pour votre tranquillité
                </p>
              </div>

              {/* Colonne 2 : Qualité */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-50 text-[#1B4D22] flex items-center justify-center mb-4 shadow-sm">
                  <Star className="w-7 h-7 stroke-[2]" />
                </div>
                <h3 className="text-gray-900 font-extrabold text-base mb-1 tracking-tight">
                  Qualité premium
                </h3>
                <p className="text-gray-500 text-sm">
                  Produits de la plus haute qualité
                </p>
              </div>

              {/* Colonne 3 : Garantie */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-50 text-[#1B4D22] flex items-center justify-center mb-4 shadow-sm">
                  <Shield className="w-7 h-7 stroke-[2]" />
                </div>
                <h3 className="text-gray-900 font-extrabold text-base mb-1 tracking-tight">
                  Garantie totale
                </h3>
                <p className="text-gray-500 text-sm">
                  Satisfaction 100% garantie
                </p>
              </div>

              {/* Colonne 4 : Service Client */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-50 text-[#1B4D22] flex items-center justify-center mb-4 shadow-sm">
                  <Headphones className="w-7 h-7 stroke-[2]" />
                </div>
                <h3 className="text-gray-900 font-extrabold text-base mb-1 tracking-tight">
                  Service client 7j/7
                </h3>
                <p className="text-gray-500 text-sm">
                  Notre équipe à votre écoute
                </p>
              </div>

            </div>
          </div>
        </section>

      <Footer />
    </div>
  );
};

export default Services;