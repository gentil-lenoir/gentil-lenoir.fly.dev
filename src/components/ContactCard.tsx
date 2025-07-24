import React from 'react';
import "../css/components/ContactCard.css";
import { FaEnvelope, FaPhone, FaWhatsapp, FaLinkedin, FaGithub, FaFacebook, FaTelegram, FaInstagram, FaQrcode } from 'react-icons/fa';

interface ContactCardProps {
  type: string;
  value: string;
  link?: string;
  suggestion?: string;
}

const iconMap: Record<string, JSX.Element> = {
  email: <FaEnvelope />,
  whatsapp: <FaWhatsapp />,
  phone: <FaPhone />,
  linkedin: <FaLinkedin />,
  github: <FaGithub />,
  facebook: <FaFacebook />,
  telegram: <FaTelegram />,
  instagram: <FaInstagram />,
  qrcode: <FaQrcode />,
};

const ContactCard: React.FC<ContactCardProps> = ({ type, value, link, suggestion }) => (
  <div className="contact-card">
    <div className="icon">{iconMap[type.toLowerCase()] || <FaEnvelope />}</div>
    <div className="info">
      <h3>{type}</h3>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">{value}</a>
      ) : (
        <span>{value}</span>
      )}
      {suggestion && <p className="suggestion">{suggestion}</p>}
    </div>
  </div>
);

export default ContactCard;
