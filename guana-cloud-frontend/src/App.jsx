import React, { useState, useEffect } from 'react';
import ChatWidget from './components/ChatWidget';
import './App.css';
import logo from './assets/logo-white-bg.png'; // CORRECCIÓN: Usando el nuevo logo blanco-fondo
import Slider from "react-slick"; // Importar el carrusel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Eliminamos las importaciones de tsparticles ya que la animación ha sido removida
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadSlim } from "tsparticles-slim";

// --- COMPONENTE PRINCIPAL DE LA APLICACIÓN ---
function App() {
  // Eliminamos el estado y la lógica de Particles
  // const [init, setInit] = React.useState(false);
  // React.useEffect(() => { ... }, []);
  // const particlesLoaded = (container) => { ... };
  // const particleOptions = { ... };

  // Manejo del scroll para el header
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Si el scroll es más de 50px
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Datos de los servicios con iconos
  const servicesData = [
    { title: "Consultoría en IA", description: "Transforme su Core de Negocio con IA. Integramos soluciones de IA Generativa y Machine Learning para crear sistemas que razonan, predicen y optimizan.", icon: "🧠" },
    { title: "Data Analysts & BI", description: "Descubra la verdad oculta en sus datos. Traducimos data compleja en dashboards interactivos e informes ejecutivos que potencian decisiones estratégicas.", icon: "📊" },
    { title: "Data Engineering", description: "Construimos las autopistas de su información. Diseñamos infraestructuras de datos en la nube que son robustas, escalables y seguras.", icon: "⚙️" },
    { title: "Data Science", description: "El futuro de su negocio, modelado hoy. Usamos técnicas avanzadas para resolver problemas complejos, desde la predicción de churn hasta la optimización de riesgo.", icon: "🔬" }
  ];

  const kaiFeatures = [
    { icon: "🧠", title: "Analista de Datos Autónomo", description: "Haga preguntas de negocio en lenguaje natural. Kai las traduce a consultas SQL, las ejecuta y le entrega la respuesta que necesita, al instante." },
    { icon: "🎟️", title: "Soporte Inteligente", description: "Automatiza todo el ciclo de vida de los tiquetes de soporte, desde la creación y priorización inteligente hasta la asignación y el cierre." },
    { icon: "🔗", title: "Orquestador de Tareas", description: "Se integra con Asana, Looker y Google Calendar para convertir conversaciones en acciones, creando tareas y agendando reuniones sin salir del chat." },
    { icon: "📚", title: "Conocimiento Centralizado", description: "Responde al instante preguntas complejas basándose en su base de conocimiento interna, actuando como el experto siempre disponible de su equipo." },
    { icon: "📊", title: "Visualización Multimodal", description: "Genere dashboards de Looker o infografías visuales sobre el estado de sus proyectos directamente desde una conversación." },
    { icon: "💻", title: "Code Review por IA", description: "Acelere sus ciclos de desarrollo. Kai puede realizar revisiones de código en sus Pull Requests de Dataform y LookML, garantizando calidad y consistencia." }
  ];

  return (
    <div id="app-container">
      <Header isScrolled={isScrolled} />
      <main className="content-wrap">
        <HeroSection /> {/* Eliminamos props de partículas */}
        <ServicesSection services={servicesData} />
        <ProductSection features={kaiFeatures} />
      </main>
      <Footer />
    </div>
  );
}

// --- SUB-COMPONENTES DE LA PÁGINA ---

const Header = ({ isScrolled }) => (
  <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
    <img src={logo} alt="Guana Cloud Logo" className="logo" />
    <nav className="nav-links">
      <a href="#services">Servicios</a>
      <a href="#product">Producto</a>
      <a href="#contact">Contacto</a>
    </nav>
    <button>Contáctanos</button>
  </header>
);

const HeroSection = () => (
  <section className="section hero">
    <div className="hero-content">
      <div className="hero-text">
        <h1>Guana Cloud: Inteligencia Artificial <span className="highlight">& Data</span> para líderes en LATAM.</h1>
        <p>Potenciamos a las industrias de tecnología y finanzas con soluciones de datos a la medida y nuestro asistente de IA de nueva generación.</p>
        <button>Agenda una Demostración</button>
      </div>
      <div className="chat-container">
        <div className="chat-widget-wrapper">
          <ChatWidget />
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = ({ services }) => (
  <section id="services" className="section services-section">
    <h2>Nuestras Capacidades: Su Ventaja Competitiva</h2>
    <div className="services-grid">
      {services.map((service, index) => (
        <ServiceCard key={index} title={service.title} description={service.description} icon={service.icon} />
      ))}
    </div>
  </section>
);

const ServiceCard = ({ title, description, icon }) => (
  <div className="service-card">
    <div className="service-card-icon">{icon}</div> {/* Mostrar el icono SVG */}
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const ProductSection = ({ features }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, centerPadding: '20px' } },
    ]
  };

  return (
    <section id="product" className="section product-section">
      <div className="product-intro">
        <span className="highlight">NUESTRO PRODUCTO</span>
        <h2>Presentamos Kai: Su Sistema Operativo de IA</h2>
        <p>Kai no es solo un asistente, es un agente autónomo que se integra en el núcleo de sus operaciones de datos para automatizar, analizar y acelerar. Creado para equipos que no tienen tiempo que perder.</p>
      </div>
      <Slider {...settings}>
        {features.map((feature, index) => (
          <div key={index}>
            <KaiFeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

const KaiFeatureCard = ({ icon, title, description }) => (
  <div className="kai-feature-card">
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Footer = () => (
  <footer className="footer">
    <p>&copy; {new Date().getFullYear()} Guana Cloud. Pura Vida y Pura Data.</p>
  </footer>
);

export default App;