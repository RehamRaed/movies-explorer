import React, { useEffect, useState } from "react";
import '../styles/Actors.css';

function People() {
  const [actors, setActors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const actorsPerPage = 8;
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(`/data/People.json`)
      .then(res => res.json())
      .then(data => setActors(data))
      .catch(err => console.error("Fetch error", err));
  }, []);

  const totalPages = Math.ceil(actors.length / actorsPerPage);

  const handlePageClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      setErrorMessage("Uh-oh! That's not a valid request!");
    } else {
      setErrorMessage("");
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = actors.slice(indexOfFirstActor, indexOfLastActor);

  return (
    <section className="people-container">
      <h2>Popular Actors</h2>

      <div className="cards_wrapper">
        {currentActors.map((actor, index) => (
          <div className="actor-card" key={index}>
            <img src={actor.image} alt={actor.name} />
            <h3>{actor.name}</h3>
            <p>{actor.bio}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageClick(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
         <span className="dots">. . .</span>
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn"
        >
          Next
        </button>
      </div>

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </section>
  );
}

export default People;
