import React ,{useState ,useEffect} from "react";

function UpcomingMovies(){
   const[allMovies,setAllMovies] =useState([]);
   const [selectedMovie, setSelectedMovie] = useState(null);
   const [fadeState, setFadeState] = useState("fade-in");
   useEffect(()=>{
    fetch(`/data/popularComingSoon.json`)
    .then(res => res.json())
    .then(data => setAllMovies(data))
    .catch(err =>console.error("Fetch Error :", err))
   }
)

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

    return(
        <section style={{padding:"60px 70px"}}>
      <h2 className="title">Upcoming Movies</h2>
      <div className="movies-grid">
        {allMovies.map(movie => (
          <div className="movie-card" key={movie.id} onClick={() => setSelectedMovie(movie)}>
            <img src={movie.image} alt={movie.title} />
            <h4>{movie.title}</h4>
            <p>⭐ {movie.score}</p>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
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
      <p><strong>main actors:</strong> {selectedMovie.main_actors?.join(', ')}</p>
    </div>
  </div>
</div>
</div>
       )}
        </section>
    )
}
export default UpcomingMovies;