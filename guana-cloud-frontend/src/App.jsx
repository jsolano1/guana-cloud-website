import React from 'react';
import ChatWidget from './components/ChatWidget';
import './App.css';
import logo from './assets/logo-dark.jpeg'; // CORRECCIÓN: Usando la extensión .jpeg

// Importaciones para la animación de partículas
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";

// --- COMPONENTE PRINCIPAL DE LA APLICACIÓN ---
function App() {
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log("Particles loaded", container);
  };
  
  // MEJORA: Opciones de partículas más sutiles
  const particleOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: 'repulse' } },
      modes: { repulse: { distance: 80, duration: 0.4 } }
    },
    particles: {
      color: { value: '#555555' },
      links: { color: '#555555', distance: 150, enable: true, opacity: 0.2, width: 1 },
      move: {
        direction: 'none', enable: true, outModes: { default: 'bounce' },
        random: false, speed: 0.5, // VELOCIDAD REDUCIDA
        straight: false
      },
      number: { density: { enable: true }, value: 60 },
      opacity: { value: 0.2 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } }
    },
    detectRetina: true,
  };

  // Datos (sin cambios)
  const servicesData = [
    { title: "Consultoría en IA", description: "Transforme su Core de Negocio con IA. Integramos soluciones de IA Generativa y Machine Learning para crear sistemas que razonan, predicen y optimizan.", features: ["Modelos Predictivos y Detección de Anomalías", "Sistemas de Recomendación y Personalización", "Automatización Inteligente de Procesos (IPA)", "Asistentes Virtuales Corporativos"] },
    { title: "Data Analysts & BI", description: "Descubra la verdad oculta en sus datos. Traducimos data compleja en dashboards interactivos e informes ejecutivos que potencian decisiones estratégicas.", features: ["Dashboards en Looker, Power BI y Tableau", "Análisis de Rentabilidad y Optimización", "Modelado de Datos para Autoservicio", "Métricas de Rendimiento y Salud del Negocio"] },
    { title: "Data Engineering", description: "Construimos las autopistas de su información. Diseñamos infraestructuras de datos en la nube que son robustas, escalables y seguras.", features: ["Arquitecturas de Data Warehouse y Data Lakes", "Pipelines de ETL y ELT de Alta Velocidad", "Gobernanza de Datos y Calidad", "Modernización de Plataformas de Datos"] },
    { title: "Data Science", description: "El futuro de su negocio, modelado hoy. Usamos técnicas avanzadas para resolver problemas complejos, desde la predicción de churn hasta la optimización de riesgo.", features: ["Modelos de Clasificación y Regresión", "Segmentación de Clientes y Comportamiento", "Optimización de Precios y Demanda", "Análisis de Series Temporales y Forecasting"] }
  ];

  return (
    <div id="app-container">
      <Header />
      <main className="content-wrap">
        <HeroSection options={particleOptions} particlesLoaded={particlesLoaded} init={init} />
        <ServicesSection services={servicesData} />
        <ProductSection />
      </main>
      <Footer />
    </div>
  );
}

// --- SUB-COMPONENTES DE LA PÁGINA ---

const Header = () => (
  <header className="header">
    <img src={logo} alt="Guana Cloud Logo" className="logo" />
    <nav className="nav-links">
      <a href="#services">Servicios</a>
      <a href="#product">Producto</a>
      <a href="#contact">Contacto</a>
    </nav>
    <button>Contáctanos</button>
  </header>
);

const HeroSection = ({ options, particlesLoaded, init }) => (
  <section className="section hero">
    {init && <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />}
    <div className="hero-text">
      <h1>Inteligencia Artificial <span className="highlight">& Data</span> para líderes en LATAM.</h1>
      <p>Potenciamos a las industrias de tecnología y finanzas con soluciones de datos a la medida y nuestro asistente de IA de nueva generación.</p>
      <button>Agenda una Demostración</button>
    </div>
    <div className="chat-container">
      <div className="chat-widget-wrapper">
        <ChatWidget />
      </div>
    </div>
  </section>
);

const ServicesSection = ({ services }) => (
  <section id="services" className="section services">
    <h2>Nuestras Capacidades: Su Ventaja Competitiva</h2>
    <div className="services-grid">
      {services.map((service, index) => (
        <ServiceCard key={index} title={service.title} description={service.description} features={service.features} />
      ))}
    </div>
  </section>
);

const ServiceCard = ({ title, description, features }) => (
  <div className="service-card">
    <h3>{title}</h3>
    <p>{description}</p>
    <ul>
      {features.map((feature, index) => <li key={index}>{feature}</li>)}
    </ul>
  </div>
);

const ProductSection = () => (
    <section id="product" className="section product-section">
      <div className="product-intro">
        <span className="highlight" style={{fontWeight: 'bold'}}>NUESTRO PRODUCTO</span>
        <h2>Presentamos Kai: Su Sistema Operativo de IA</h2>
        <p>Kai no es solo un asistente, es un agente autónomo que se integra en el núcleo de sus operaciones de datos para automatizar, analizar y acelerar. Creado para equipos que no tienen tiempo que perder.</p>
      </div>
      <div className="features-grid">
        <FeatureCard icon="🧠" title="Analista de Datos Autónomo" description="Haga preguntas de negocio en lenguaje natural. Kai las traduce a consultas SQL, las ejecuta y le entrega la respuesta que necesita, al instante." />
        <FeatureCard icon="🎟️" title="Soporte Inteligente" description="Automatiza todo el ciclo de vida de los tiquetes de soporte, desde la creación y priorización inteligente hasta la asignación y el cierre." />
        <FeatureCard icon="🔗" title="Orquestador de Tareas" description="Se integra con Asana, Looker y Google Calendar para convertir conversaciones en acciones, creando tareas y agendando reuniones sin salir del chat." />
        <FeatureCard icon="📚" title="Conocimiento Centralizado" description="Responde al instante preguntas complejas basándose en su base de conocimiento interna, actuando como el experto siempre disponible de su equipo." />
        <FeatureCard icon="📊" title="Visualización Multimodal" description="Genere dashboards de Looker o infografías visuales sobre el estado de sus proyectos directamente desde una conversación." />
        <FeatureCard icon="💻" title="Code Review por IA" description="Acelere sus ciclos de desarrollo. Kai puede realizar revisiones de código en sus Pull Requests de Dataform y LookML, garantizando calidad y consistencia." />
      </div>
    </section>
  );
  
const FeatureCard = ({ icon, title, description }) => (
    <div className="feature-card">
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