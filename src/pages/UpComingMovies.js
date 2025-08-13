import React ,{useState ,useEffect} from "react";
import MovieModal from "../components/MovieModal";

function UpcomingMovies(){
   const[allMovies,setAllMovies] =useState([]);
   const [selectedMovie, setSelectedMovie] = useState(null);
   const [fadeState, setFadeState] = useState("fade-in");

     const platformLogos = {
  "Netflix": "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "Disney+": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
  "HBO Max": "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg",
  "Apple TV": "https://upload.wikimedia.org/wikipedia/en/a/ae/Apple_TV_%28logo%29.svg",
  "Paramount+": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Paramount%2B_logo.svg",
  "Peacock": "https://upload.wikimedia.org/wikipedia/commons/d/d3/NBCUniversal_Peacock_Logo.svg",
  "Max": "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg",
  "Amazon Prime": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
  "Amazon Prime Video": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
  "OSN Movies Hollywood": "https://upload.wikimedia.org/wikipedia/commons/7/71/Hollywood-Logo.svg",
  "Hulu": "https://upload.wikimedia.org/wikipedia/commons/0/03/Hulu_logo_%282014%29.svg"
};


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
        <section className="UpcomingMovies-container" style={{padding:"60px 90px"}}>
           <h2 style={{paddingLeft:"35px" , color:"white"}}>Upcoming Movies</h2>
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
          <p><strong>Main Actors:</strong> {selectedMovie.main_actors?.join(', ')}</p>
          <div style={{display:"flex" ,gap :"5px"}}><strong>Available on: </strong>
           <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {selectedMovie.available_on.map(name => (
              <img
                key={name}
                src={platformLogos[name]}
                alt={name}
                title={name}
                style={{ width: 50, height: 25, objectFit: 'contain' }}
              />
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
        </section>
    )
}
export default UpcomingMovies;