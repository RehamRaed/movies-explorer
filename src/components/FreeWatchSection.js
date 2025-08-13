import React, { useEffect, useState } from 'react';
import '../styles/FreeWatchSection.css'; 

function FreeWatchSection() {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState('movie');
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
    const file = type === 'movie' ? 'freeMovies' : 'freeOnTv';
    fetch(`/data/${file}.json`)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Fetch Error", err));
  }, [type]);

  return (
    <div className="FreeWatch-section">
     <div className="FreeWatch-toggle">
  <span className="label">Free to Watch</span>
  <div className="buttons">
    <span className={`indicator ${type}`} />
    <button
      onClick={() => setType('movie')}
      className={type === 'movie' ? 'active' : ''}
    >
      streaming
    </button>
    <button
      onClick={() => setType('onTv')}
      className={type === 'onTv' ? 'active' : ''}
    >
      On Tv
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
  style={{bottom: "85px" }}
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
  <div className={`edge-fade-right ${showOverlay ? 'visible' : 'hidden'}`} style={{height: "87%"}}/>
</div>
    </div>
  );
}

export default FreeWatchSection;