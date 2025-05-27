import React ,{useState ,useEffect} from "react";

function UpcomingMovies(){
   const[allMovies,setAllMovies] =useState([]);
   useEffect(()=>{
    fetch(`/data/popularComingSoon.json`)
    .then(res => res.json())
    .then(data => setAllMovies(data))
    .catch(err =>console.error("Fetch Error :", err))
   }
)
    return(
        <section className="UpcomingMovies-container" style={{padding:"60px 90px"}}>
           <h2 style={{paddingLeft:"35px" , color:"white"}}>Upcoming Movies</h2>
      <div className="movies-grid">
        {allMovies.map(movie => (
          <div className="movie-card" key={movie.id}>
            <img src={movie.image} alt={movie.title} />
            <h4>{movie.title}</h4>
            <p>⭐ {movie.score}</p>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
        </section>
    )
}
export default UpcomingMovies;