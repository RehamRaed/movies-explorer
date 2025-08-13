import { useEffect, useState } from 'react';
import "../styles/PopularSection.css"

function PopularSection() {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState('streaming'); 
  const [showOverlay, setShowOverlay] = useState(true);

  const handleScroll = (e) => {
    const { scrollLeft } = e.target;
    setShowOverlay(scrollLeft <= 10);
  };

  useEffect(() => {
    const file =
      type === 'streaming'
        ? 'popularStreaming'
        : type === 'onTv'
        ? 'popularOnTv'
        : 'popularComingSoon';

    fetch(`/data/${file}.json`)
      .then(res => res.json())
      .then(data => {
        const filtered =
          (type === 'streaming' || type === 'onTv')
            ? data.filter(item => item.purpose === 'main')
            : data;

        setMovies(filtered);
      })
      .catch(err => console.error("Fetch error", err));
  }, [type]);

  return (
    <div className="popular-section">
      <div className="popular-toggle">
        <span className="label">Popular</span>
        <div className="buttons">
          <span className={`indicator ${type}`} />
          <button
            onClick={() => setType('streaming')}
            className={type === 'streaming' ? 'active' : ''}
          >
            streaming
          </button>
          <button
            onClick={() => setType('onTv')}
            className={type === 'onTv' ? 'active' : ''}
          >
            OnTv
          </button>
          <button
            onClick={() => setType('comingSoon')}
            className={type === 'comingSoon' ? 'active' : ''}
          >
            Upcoming
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
              <img src={movie.image} alt="popular-img" />
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

export default PopularSection;