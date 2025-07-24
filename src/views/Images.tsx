import React from 'react';
import '../css/views/Images.css';

const imageList = [
  'gentil1.jpg','gentil2.jpg','gentil3.jpg','gentil4.jpg','gentil5.jpg','gentil6.jpg','gentil7.jpg','gentil8.jpg','gentil9.jpg','gentil10.jpg','gentil11.jpg','gentil12.jpg','gentil13.jpg','gentil14.jpg','gentil15.jpg'
];

const Images = () => (
  <section className="images-section">
    <h1 className="images-title">Images de Gentil</h1>
    <div className="images-grid">
      {imageList.map(img => (
        <div className="imgCard" key={img}>
          <img src={`/img/photos/${img}`} alt={img} />
          <div><a href={`/img/photos/${img}`} download>Télécharger</a></div>
        </div>
      ))}
    </div>
  </section>
);

export default Images;
