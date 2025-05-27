import React, { useState, useEffect } from "react";

function TopRatedMovies() {
  const [allMovies, setAllMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

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

  return (
    <section className="TopRatedMovies-container" style={{padding:"60px 90px"}}>
      <h2 style={{paddingLeft:"35px" , color:"white"}}>Top Rated Movies</h2>
      <div className="movies-grid">
        {allMovies.slice(0, visibleCount).map(movie => (
          <div className="movie-card" key={`${movie.id}-${movie.title}`}>
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
    </section>
  );
}

export default TopRatedMovies;
