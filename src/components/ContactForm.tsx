import React, { useRef, useEffect } from 'react';
import "../css/components/ContactForm.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  // Fonction de tracking des visiteurs
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const timestamp = new Date().toISOString();
        const userAgent = navigator.userAgent;
        const currentPage = 'contact'; // Page spécifique pour le formulaire

        // Récupération IP et géolocalisation
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipRes.json();
        
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
        const geoData = await geoRes.json();

        // Données du visiteur
        const visitorData = {
          time: timestamp,
          ue: userAgent,
          ip: ip,
          country: geoData.country_name,
          city: geoData.city,
          region: geoData.region,
          page: currentPage,
          device: {
            screen: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language
          }
        };

        // Envoi des données de tracking
        await fetch('http://localhost:8088/notify/visitors.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(visitorData)
        });

      } catch (error) {
        console.error("Erreur de tracking:", error);
      }
    };

    trackVisitor();
  }, []);

  // Gestion de l'envoi du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.current) return;

    try {
      const formData = new FormData(form.current);
      
      const response = await fetch("http://localhost:8088/notify/message.php", {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        }
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        form.current.reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(error.message || 'Erreur lors de l\'envoi du message.');
      console.error('Erreur:', error);
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="contact-form">
      <h3 style={{textAlign: "center"}}>Envoyez un message à Gentil</h3>
      <input type="text" name="user_name" placeholder="Votre nom" required />
      <input type="email" name="user_email" placeholder="Votre email" required />
      <textarea name="message" placeholder="Votre message" required />
      <button type="submit">Envoyer</button>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </form>
  );
};

export default ContactForm;