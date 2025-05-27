import { useNavigate } from 'react-router-dom';
import '../styles/HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="overlay">
        <h1>Welcome to<span> Movie Verse</span></h1>
        <p>Your quick destination for movies discovery, without the complexity and boring details — everything is simplified so you can enjoy watching your way</p>
        <button onClick={() => navigate('/movies')} className='button'>Explore Movies</button>
      </div>
    </section>
  );
}

export default HeroSection;