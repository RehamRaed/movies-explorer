import React, { useState, useEffect } from "react";

function TopRatedMovies() {
  const [allMovies, setAllMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [fadeState, setFadeState] = useState("fade-in");
  useEffect(() => {
    const files = [
      `/data/freeMovies.json`,
      `/data/freeOnTv.json`,
      `/data/trendingToday.json`,
      `/data/trendingWeek.json`,
      `/data/popularOnTV.json`,
      `/data/popularStreaming.json`
    ];

    Promise.all(
      files.map(file =>
        fetch(file)
          .then(res => {
            if (!res.ok) {
              throw new Error(`Failed to fetch ${file}`);
            }
            return res.json();
          })
          .catch(err => {
            console.error(`Error fetching: ${file}`, err.message);
            return []; 
          })
      )
    )
      .then(results => {
        const mergedMovies = results.flat();
        const topRated = mergedMovies.filter(movie => movie.topRated === true);
        setAllMovies(topRated);
      })
      .catch(error => console.error("Fetch error:", error));
  }, []);
  const handleShowMore = () => {
    setVisibleCount(allMovies.length);
  };
  useEffect(() => {
      if (selectedMovie) {
        document.body.classList.add("blur-background");
      } else {
        document.body.classList.remove("blur-background");
      }
    }, [selectedMovie]);
  
     const handleCloseModal = () => {
      setFadeState("fade-out");
      setTimeout(() => {
        setSelectedMovie(null);
        setFadeState("fade-in");
      },600); 
    };
  

  return (
    <section className="TopRatedMovies-container" style={{padding:"60px 90px"}}>
      <h2 style={{paddingLeft:"35px" , color:"white"}}>Top Rated Movies</h2>
      <div className="movies-grid">
        {allMovies.slice(0, visibleCount).map(movie => (
          <div className="movie-card" key={`${movie.id}-${movie.title}`} onClick={() => setSelectedMovie(movie)}>
            <img src={movie.image} alt={movie.title} />
            <h4>{movie.title}</h4>
            <p>⭐ {movie.score}</p>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
        {visibleCount < allMovies.length && (
        <div className="show-more-container">
          <button className="show-more-btn" onClick={handleShowMore}>
            Show More
          </button>
        </div>
        
      )}
      {selectedMovie && (
                <div className="modal-overlay" onClick={handleCloseModal}>
          <div className={`movie-modal ${fadeState}`} onClick={(e) => e.stopPropagation()}>
  <img src={selectedMovie.image} alt={selectedMovie.title} />

  <div className="modal-content">
    <button className="close-btn" onClick={handleCloseModal}>×</button>
    <h2>{selectedMovie.title}</h2>
    <p><strong>Overview:</strong> {selectedMovie.description}</p>
    <div className="modal-details">
      <p><strong>Score:</strong> {selectedMovie.score}</p>
      <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
      <p><strong>Genres:</strong> {selectedMovie.genres?.join(', ')}</p> 
      <p><strong>Available on:</strong> {selectedMovie.available_on?.join(', ')}</p>
      <p><strong>main_actors:</strong> {selectedMovie.main_actors?.join(', ')}</p>
    </div>
  </div>
</div>
</div>
       )}
    </section>
  );
}

export default TopRatedMovies;
