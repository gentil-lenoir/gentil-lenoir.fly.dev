import React, { useEffect } from 'react';
import '../css/views/Portfolio.css';

const skillsData = [
  { name: "Informatique", level: "60%" },
  { name: "Programmation Web", level: "80%" },
  { name: "Traitement Photos et Vidéos", level: "50%" },
  { name: "Web Design", level: "60%" },
  { name: "Electronique + Electricité", level: "40%" },
  { name: "Programmation App et autres++", level: "70%" },
  { name: "HTML + CSS", level: "80%" },
  { name: "JavaScript", level: "60%" },
  { name: "FrameWorks", level: "70%" }
];

const portfolioData = [
  {
    img: '/img/social vid downloader.png',
    title: 'Social Vid Downloader',
    desc: 'Un site web de Téléchqrgement des vidéos depuis différents reseaux sociax et même sans watermark'
  },
  {
    img: '/img/electronic.jpg',
    title: 'Electronique',
    desc: 'Différentes réalisations en Electronique et Programmation Arduino C++.'
  },
  {
    img: '/img/ebook.jpg',
    title: 'E-Book-WebSite',
    desc: 'Site web de vente de livres digitaux en ligne, payants et gratuits.'
  },
  {
    img: "/img/virtualgoods-e-commerce.jpg",
    title: "VirtualGoods",
    desc: "Site web de vente de biens virtuels, avec paiement sécurisé et gestion des transactions."
  },
  {
    img: "/img/novellemarket.png",
    title: "NovelleMarket",
    desc: "Site web de vente e-commerce de biens non virtuels, multiples vendeurs et multiples acheteurs"
  }
];

const Portfolio = () => {
  useEffect(() => {
    const bars = document.querySelectorAll<HTMLElement>('.skill-level');
    bars.forEach(bar => {
      const width = bar.dataset.level || '0%';
      bar.style.width = width;
    });
  }, []);

  return (
    <section className="portfolio-section">
      <h1 className="portfolio-title" style={{textAlign:"center"}}>Portfolio de Gentil</h1>

      <h2 style={{ textAlign: "center", marginBottom: "-40px" }}>
        Les Compétences de Gentil
      </h2>
      <section className="skills-section">
        {skillsData.map((skill, idx) => (
          <div className="one-skill" key={idx}>
            <h3 className="skill-title">{skill.name}</h3>
            <div className="skillbar">
              <div className="skill-level" data-level={skill.level}></div>
            </div>
          </div>
        ))}
      </section>
        <hr />
      <section ><br />
        <h2 style={{ textAlign: "center"}}>Le Portfolio de Gentil</h2>
        <div className="cards-portfolio">
            {portfolioData.map((item, idx) => (
            <div className="one-portfolio" key={idx}>
                <img src={item.img} alt={item.title} />
                <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                </div>
            </div>
            ))}
        </div>
      </section><br />
    </section>
  );
};

export default Portfolio;
