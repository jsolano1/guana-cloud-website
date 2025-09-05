import React from 'react';
import ChatWidget from './components/ChatWidget';
import './App.css';

// Importa el logo (asegúrate de que la ruta sea correcta)
// Por ahora, usaremos un placeholder de texto si no tienes la imagen en la carpeta `src`
// Para usar tu logo, mueve `image_cc5d06.png` a `src/assets/` y renómbralo a `logo.png`
import logo from './assets/logo.png'; 

function App() {

  // Datos de los servicios para mostrarlos dinámicamente
  const servicesData = [
    {
      title: "Consultoría en IA",
      description: "Transforme su Core de Negocio con IA. Integramos soluciones de IA Generativa y Machine Learning para crear sistemas que razonan, predicen y optimizan.",
      features: [
        "Modelos Predictivos y Detección de Anomalías",
        "Sistemas de Recomendación y Personalización",
        "Automatización Inteligente de Procesos (IPA)",
        "Asistentes Virtuales Corporativos"
      ]
    },
    {
      title: "Data Analysts & BI",
      description: "Descubra la verdad oculta en sus datos. Traducimos data compleja en dashboards interactivos e informes ejecutivos que potencian decisiones estratégicas.",
      features: [
        "Dashboards en Looker, Power BI y Tableau",
        "Análisis de Rentabilidad y Optimización",
        "Modelado de Datos para Autoservicio",
        "Métricas de Rendimiento y Salud del Negocio"
      ]
    },
    {
      title: "Data Engineering",
      description: "Construimos las autopistas de su información. Diseñamos infraestructuras de datos en la nube que son robustas, escalables y seguras.",
      features: [
        "Arquitecturas de Data Warehouse y Data Lakes",
        "Pipelines de ETL y ELT de Alta Velocidad",
        "Gobernanza de Datos y Calidad",
        "Modernización de Plataformas de Datos"
      ]
    },
    {
        title: "Data Science",
        description: "El futuro de su negocio, modelado hoy. Usamos técnicas avanzadas para resolver problemas complejos, desde la predicción de churn hasta la optimización de riesgo.",
        features: [
          "Modelos de Clasificación y Regresión",
          "Segmentación de Clientes y Comportamiento",
          "Optimización de Precios y Demanda",
          "Análisis de Series Temporales y Forecasting"
        ]
      }
  ];

  return (
    <div id="app-container">
      <Header />
      <main className="content-wrap">
        <HeroSection />
        <ServicesSection services={servicesData} />
      </main>
      <Footer />
    </div>
  );
}

// Componente Header
const Header = () => (
  <header className="header">
    { <img src={logo} alt="Guana Cloud Logo" className="logo" /> }
    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Guana Cloud</span>
    <nav className="nav-links">
      <a href="#services">Servicios</a>
      <a href="#producto">Producto</a>
      <a href="#nosotros">Nosotros</a>
    </nav>
    <button>Contáctanos</button>
  </header>
);

// Componente Hero Section
const HeroSection = () => (
  <section className="section hero">
    <div className="hero-text">
      <h1>Inteligencia Artificial <span className="highlight">& Data</span> para líderes en LATAM.</h1>
      <p>
        Potenciamos a las industrias de tecnología y finanzas con soluciones de datos a la medida y nuestro asistente de IA de nueva generación.
      </p>
      <button>Agenda una Demostración</button>
    </div>
    <div className="chat-container">
      {/* El ChatWidget con los nuevos estilos se verá perfecto aquí */}
      <ChatWidget />
    </div>
  </section>
);

// Componente Services Section
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

// Componente Service Card
const ServiceCard = ({ title, description, features }) => (
    <div className="service-card">
        <h3>{title}</h3>
        <p>{description}</p>
        <ul>
            {features.map((feature, index) => <li key={index}>{feature}</li>)}
        </ul>
    </div>
);


// Componente Footer
const Footer = () => (
  <footer className="footer">
    <p>&copy; {new Date().getFullYear()} Guana Cloud. Desde Costa Rica para toda LATAM.</p>
  </footer>
);

export default App;