import { useEffect, useState } from 'react';
import '../styles/TrendingSection.css'; 

function TrendingSection() {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState('today');
  const [showOverlay, setShowOverlay] = useState(true);

const handleScroll = (e) => {
  const { scrollLeft } = e.target;
  if (scrollLeft > 10) {
    setShowOverlay(false);
  } else {
    setShowOverlay(true);
  }
}; 

  useEffect(() => {
    const file = type === 'today' ? 'trendingToday' : 'trendingWeek';
    fetch(`/data/${file}.json`)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Fetch Error", err));
  }, [type]);


  
  return (
    <div className="trending-section">
     <div className="trending-toggle">
  <span className="label">Trending</span>
  <div className="buttons">
    <span className={`indicator ${type}`} />
    <button
      onClick={() => setType('today')}
      className={type === 'today' ? 'active' : ''}
    >
      Today
    </button>
    <button
      onClick={() => setType('week')}
      className={type === 'week' ? 'active' : ''}
    >
      This Week
    </button>
  </div>
</div>
     <div className="cards-wrapper" onScroll={handleScroll}>
  <div className="cards">
    {movies.map(movie => (
      <div key={movie.id} className="card">
        <div
  className={`score-circle ${
    movie.score > 70 ? 'green' : movie.score > 40 ? 'orange' : 'red'
  }`}
  data-score={movie.score}
>
  <span>{movie.score}%</span>
</div>
        <img src={movie.image} alt="trend-img" />
        <h5>{movie.title}</h5>
        <p>{movie.release_date}</p>
      </div>
    ))}
  </div>
  <div className={`edge-fade-right ${showOverlay ? 'visible' : 'hidden'}`} style={{height: "91%"}}/>
</div>
    </div>
  );
}

export default TrendingSection;