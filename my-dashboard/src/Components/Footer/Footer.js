// Footer.js
import React from 'react';
import './Footer.css';

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
                <div className="footer-right">
                    <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {currentYear} Talent Corner HR Services Pvt. Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;