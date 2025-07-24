import React from 'react';
import '../css/views/Bio.css';
import ContactForm from '../components/ContactForm.tsx';

const Bio = () => (
  <section className="bio-section">
    <div style={{ textAlign: 'center' }}>
        <h1 className="bio-title">Biographie de Gentil Le NoiR</h1>
        <p className="link"><a href="/images">VOIR SES IMAGES</a></p>
        <div className="cv-section">
        <a href="/cv" target="_blank" rel="noopener noreferrer">Lire le C V</a><br />
        <a href="/doc/gentil_le_noir_c_v.pdf" download>Télécharger le C V</a>
    </div>

    </div>
    <div className="bio-content">
      <p>
        Il s'appelle <strong>Gentil Le Noir Maliyamungu Balegamire</strong> et il est <strong>électronicien</strong>, <strong>développeur web</strong> et <strong>programmeur</strong>. Passionné par la technologie, il aime concevoir des solutions innovantes et partager ses connaissances avec la communauté.
      </p>
      <p>
        Ce site est une vitrine de ses compétences, de ses projets et de ses valeurs. Il se tient disponible pour toute collaboration ou question.
      </p>
      <p>
        Né à <strong>Goma</strong>, en <strong>Congo RDC</strong>, il a grandi dans un environnement où la curiosité pour la technologie était encouragée dès son plus jeune âge. Très tôt, il a manifesté un intérêt particulier pour l'informatique, l'électronique et la programmation.
      </p>
      <p>
        Il a effectué ses études à l'école primaire <em>Matumaini</em>, puis au secondaire à l'Institut <em>Maranatha</em> et au <em>Complexe Scolaire Adventiste Bethel</em>, où il a obtenu son diplôme en <strong>électronique industrielle</strong>.
      </p>
      <p>
        Son parcours professionnel a commencé en tant que stagiaire sur des projets de développement web, où il a rapidement acquis de solides compétences en programmation front-end et back-end, ainsi qu’en gestion de bases de données.
      </p>
      <p>
        En parallèle, il a approfondi ses connaissances en électronique, notamment avec des plateformes telles qu’<em>Arduino</em> et <em>Raspberry Pi</em>, lui permettant ainsi de fusionner matériel et logiciel dans ses projets.
      </p>
      <p>
        Sa carrière se caractérise par une quête constante d’apprentissage et d’innovation. Il se tient régulièrement informé des dernières tendances technologiques afin d’offrir des solutions modernes, performantes et adaptées aux besoins des utilisateurs.
      </p>
      <p>
        Parmi ses valeurs fondamentales figurent la collaboration, l’intégrité et la persévérance. Il considère l’échec non comme une fin, mais comme une étape essentielle vers la réussite, et croit que la diversité des idées enrichit chaque projet.
      </p>
      <p>
        Il soutient également l’accès à l’éducation et à la technologie comme leviers essentiels au développement personnel et collectif.
      </p>
      <p>
        Une citation qui l’inspire profondément est celle de Nelson Mandela : <em>"Cela semble toujours impossible jusqu'à ce que ce soit fait."</em>
      </p>
      <p>
        En résumé, il est un <strong>développeur</strong>, <strong>programmeur</strong>, <strong>informaticien</strong> et <strong>électronicien</strong>, passionné par la création, l’innovation et la transmission du savoir.
      </p>
      <p>
        Pour toute demande de collaboration ou échange, il se tient à votre disposition et sera ravi de partager ses expériences.
      </p>
    </div>
    <ContactForm />
  </section>
);

export default Bio;
