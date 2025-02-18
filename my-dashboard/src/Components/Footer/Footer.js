import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="footer-content">
                <div className="footer-left">
                    <p>Talent Corner H.R. Services Pvt. Ltd.</p>
                    <p>708 & 709, Bhaveshwar Arcade Annex, LBS Marg, Opp Shreyas Cinema, Ghatkopar West, Mumbai - 400086</p>
                    <p>Office: +91 22 4297 5100</p>
                    <p>Email: <a href="mailto:contact@talentcorner.in">contact@talentcorner.in</a></p>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {currentYear} Talent Corner HR Services Pvt. Ltd. All rights reserved.</p>
                    <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <FaYoutube />
                    </a>
                </div>
            </div>
            </div>
        </footer>
    );
};

export default Footer;