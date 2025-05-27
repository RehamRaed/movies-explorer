import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
     
        <div className="social_container">
          <span >Follow Movies Verse on :</span>
          <div className="d-flex justify-content-center">
            <a href="#" className="footer-icon "><i className="bi bi-facebook"></i></a>
            <a href="#" className="footer-icon"><i className="bi bi-twitter-x"></i></a>
            <a href="#" className="footer-icon "><i className="bi bi-instagram"></i></a>
            <a href="#" className="footer-icon"><i className="bi bi-youtube"></i></a>
            <a href="#" className="footer-icon"><i className="bi bi-tiktok"></i></a>
          </div>
        </div>
       

        <div className="footer-links d-flex flex-wrap justify-content-center gap-3 mb-3">
          <a href="#about" >About</a>
          <a href="#help" >Help Center</a>
          <a href="#careers" >Careers</a>
          <a href="#privacy" >Privacy Policy</a>
          <a href="#dsa" >Digital Services Act</a>
          <a href="#terms" >Terms of Use</a>
          <a href="#cookies" >Cookie Settings</a>
        </div>

        <div className="text-secondary small">
          © 2025 Chemistry of Emotions. All rights reserved.
        </div>
      
    </footer>
  );
};

export default Footer;