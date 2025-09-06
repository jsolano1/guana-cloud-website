import React, { useState, useEffect } from 'react';
import ChatWidget from './components/ChatWidget';
import './App.css';
import logo from './assets/logo-white-bg.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- IMPORTA TUS IMÁGENES DE SERVICIOS ---
import servicioIA from './assets/servicio-ia.jpg';
import servicioAnalyst from './assets/servicio-analyst.jpg';
import servicioEngineering from './assets/servicio-engineering.jpg';
import servicioScientist from './assets/servicio-scientist.jpg';


// --- COMPONENTE PRINCIPAL DE LA APLICACIÓN ---
function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesData = [
    { title: "IA Consulting", description: "Transforme su Core de Negocio con IA. Integramos soluciones de IA Generativa y Machine Learning para crear sistemas que razonan, predicen y optimizan.", image: servicioIA },
    { title: "Data Analysts & BI", description: "Descubra la verdad oculta en sus datos. Traducimos data compleja en dashboards interactivos e informes ejecutivos que potencian decisiones estratégicas.", image: servicioAnalyst },
    { title: "Data Engineering", description: "Construimos las autopistas de su información. Diseñamos infraestructuras de datos en la nube que son robustas, escalables y seguras.", image: servicioEngineering },
    { title: "Data Science", description: "El futuro de su negocio, modelado hoy. Usamos técnicas avanzadas para resolver problemas complejos, desde la predicción de churn hasta la optimización de riesgo.", image: servicioScientist }
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
        <HeroSection />
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
            <a href="#services">Capacidades</a>
            <a href="#product">Producto</a>
        </nav>
        <button>Agendar Demo</button>
    </header>
);

const HeroSection = () => (
  <section className="hero">
    <div className="hero-text">
      <h1>Inteligencia <span className="highlight">Artificial & Data</span> para líderes en LATAM.</h1>
      <p>Transformamos datos en su activo más valioso. Interactúe con nuestro asistente y descubra el potencial que podemos desbloquear juntos.</p>
    </div>
    <div className="chat-container">
      <div className="chat-widget-wrapper">
        <ChatWidget />
      </div>
    </div>
  </section>
);

const ServicesSection = ({ services }) => (
  <section id="services" className="services-section">
    <div className="services-intro">
      <h2>Nuestras Capacidades</h2>
      <p>Desde la estrategia hasta la implementación, nuestro equipo senior lo acompaña en cada paso de su viaje hacia una cultura basada en datos.</p>
    </div>
    <div className="service-item-wrapper">
      {services.map((service, index) => (
        <ServiceItem
          key={index}
          title={service.title}
          description={service.description}
          image={service.image}
          isReversed={index % 2 !== 0}
        />
      ))}
    </div>
  </section>
);

const ServiceItem = ({ title, description, image, isReversed }) => (
  <div className={`service-item ${isReversed ? 'reversed' : ''}`}>
    <div className="service-image">
      <img src={image} alt={title} />
    </div>
    <div className="service-text">
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Conocer más</button>
    </div>
  </div>
);


const ProductSection = ({ features }) => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "80px",
        slidesToShow: 3,
        speed: 700,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 2, centerPadding: '60px' } },
            { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: '40px' } }
        ]
    };

    return (
        <section id="product" className="section product-section">
            <div className="product-intro">
                <span className="highlight">NUESTRO PRODUCTO</span>
                <h2>Presentamos Kai: Su Sistema Operativo de IA</h2>
                <p>Kai no es solo un asistente, es un agente autónomo que se integra en el núcleo de sus operaciones de datos para automatizar, analizar y acelerar.</p>
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