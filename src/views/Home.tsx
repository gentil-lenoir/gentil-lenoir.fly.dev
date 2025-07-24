import React, { useEffect, useState } from 'react';
import '../css/views/Home.css';
import ContactForm from '../components/ContactForm.tsx';

const Home = () => {
  const gentilAge = new Date().getFullYear() - 2007;
  const [isTracked, setIsTracked] = useState(false);

  // Fonction de tracking avec mémoïsation et vérification de session
  const trackVisitor = React.useCallback(async () => {
    if (isTracked) return;
    
    try {
      const timestamp = new Date().toISOString();
      const userAgent = navigator.userAgent;

      // Vérifier si déjà tracké dans sessionStorage
      const lastTracked = sessionStorage.getItem('lastTracked');
      if (lastTracked && Date.now() - parseInt(lastTracked) < 3600000) { // 1 heure
        return;
      }

      // Récupération IP et géolocalisation
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();
      
      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const geoData = await geoResponse.json();

      // Données à envoyer
      const visitorData = {
        time: timestamp,
        ue: userAgent,
        ip: ip,
        country: geoData.country_name,
        city: geoData.city,
        region: geoData.region,
        loc: `${geoData.latitude},${geoData.longitude}`,
        device: {
          screen: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language
        },
        page: 'home'
      };

      // Envoi au backend
      await fetch(`http://localhost:8088/notify/visitors.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorData)
      });

      sessionStorage.setItem('lastTracked', Date.now().toString());
      setIsTracked(true);
      
    } catch (err) {
      console.error("Erreur tracking:", err);
      // Envoi minimal en cas d'erreur
      await fetch(`http://localhost:8088/notify/visitors.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          time: new Date().toISOString(), 
          ue: navigator.userAgent,
          page: 'home'
        })
      });
    }
  }, [isTracked]);

  // useEffect(() => {
  //   // Délai pour éviter de bloquer le rendu initial
  //   const timer = setTimeout(() => {
  //     trackVisitor();
  //   }, 3000); // 3 secondes après le chargement

  //   return () => clearTimeout(timer);
  // }, [trackVisitor]);

  const ContactCard = (label: string, value: string, icon: string) => (
    <div className="one-contact">
      <img src={icon} alt={label} className="contact-icon" />
      <div>
        <h4>{label}</h4>
        <p>{value}</p>
      </div>
    </div>
  );

  return (
    <section className="home-page">
      <h1 className="welcomes-h1" style={{textAlign:"center"}}>Bienvenue sur le site de Gentil Le NoiR M.B.</h1>

      <div className="gentil-passeport-container">
        <img src="/img/logo.png" className="gentil-passeport" alt="Gentil Le NoiR" />
      </div>

      <p className="gentil-description">
        <strong>GENTIL LE NOIR MALIYAMUNGU B</strong><br />
        <mark>Développeur Web</mark> | <mark>Electronicien</mark> | <mark>Informaticien</mark> | <mark>Programmeur</mark>
      </p>

      <a className="link" href="/images">VOIR SES IMAGES</a>

      <section className="contacts-section">
        <h3 style={{textAlign: "center"}}>Contacts</h3>
        {ContactCard("WhatsApp", "+243978089552", "/img/whatsapp.png")}
        {ContactCard("Email", "gentillenoir075@gmail.com", "/img/gmail.png")}
        <a href="/contacts">voir plus ...</a>
      </section>

      <ContactForm />

      <section className="competences">
        <h2 style={{ textAlign: 'center' }}>Compétences Professionnelles</h2>

        <h4>Développement Web</h4>
        <p>Il conçoit des sites interactifs, responsives et modernes, aussi bien en Front-End qu’en Back-End, avec des frameworks puissants.</p>

        <h4>Informatique</h4>
        <p>Il maîtrise les outils bureautiques, les systèmes numériques et informatiques spécialisés, avec une bonne culture technique.</p>

        <h4>Électronique</h4>
        <p>Il réalise des montages électroniques, des projets Arduino, et sait diagnostiquer, souder et programmer des composants.</p>

        <h4>Programmation</h4>
        <p>Il développe des applications web, mobiles, desktop, et embarquées, combinant ses compétences logicielles et électroniques.</p>
      </section>

      <section className="cv-section">
        <a href="/cv" target="_blank" rel="noopener noreferrer">Lire le C V</a><br />
        <a href="/doc/gentil_le_noir_c_v.pdf" download>Télécharger le C V</a>
      </section>

      <section className="bio-sect">
        <h2>Biographie Brève</h2>
        <p>
          <strong>Gentil Le NoiR M.B.</strong> est un jeune développeur web passionné, electronicien expérimenté, informaticien polyvalent et programmeur créatif. <br />
          Né en 2007 au Sud-Kivu en <em>République Démocratique du Congo</em>, il est de nationalité congolaise.<br />
          Il travaille activement sur des projets numériques et électroniques à haute valeur ajoutée.
        </p>
        <p>
          Grâce à sa passion, son sérieux et son envie constante d’apprendre, il a déjà réalisé plusieurs projets ambitieux dans les domaines du web et de l’électronique. Il a aujourd’hui <mark>{gentilAge} ans</mark>, avec un avenir prometteur.
        </p>
        <p><a href="/biography">Voir plus...</a></p>
      </section>
    </section>
  );
};

export default Home;
