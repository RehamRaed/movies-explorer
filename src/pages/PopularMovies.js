import { useEffect, useState } from 'react';
import '../styles/PopularMovies.css';

function PopularMovies() {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(15);
  const [sortOption, setSortOption] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [allGenres, setAllGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [fadeState, setFadeState] = useState("fade-in");

  const yearRanges = [
    '2025-2020',
    '2019-2014',
    '2013-2008',
    '2007-2002',
    '2001-1996',
    '1995-1990',
    '1989-1980',
    'before 1980'
  ];

  useEffect(() => {
    const fetchTV = fetch('/data/popularOnTV.json').then(res => res.json());
    const fetchStreaming = fetch('/data/popularStreaming.json').then(res => res.json());

    Promise.all([fetchTV, fetchStreaming])
      .then(([tvData, streamingData]) => {
        const tvWithCategory = tvData.map((item, index) => ({
          ...item,
          id: `tv-${index}`,
          category: 'TV',
        }));

        const streamingWithCategory = streamingData.map((item, index) => ({
          ...item,
          id: `stream-${index}`,
          category: 'Streaming',
        }));

        const merged = [...tvWithCategory, ...streamingWithCategory];
        setAllMovies(merged);
        setFilteredMovies(merged);

        const genres = Array.from(new Set(
          merged.flatMap(movie => Array.isArray(movie.genres) ? movie.genres : [])
        )).sort();

        setAllGenres(genres);
      })
      .catch(err => console.error('Error loading data:', err));
  }, []);

  useEffect(() => {
    let filtered = [...allMovies];

    if (selectedYear) {
      if (selectedYear === 'before 1980') {
        filtered = filtered.filter(movie =>
          new Date(movie.release_date).getFullYear() < 1980
        );
      } else {
        const [start, end] = selectedYear.split('-').map(Number);
        filtered = filtered.filter(movie => {
          const year = new Date(movie.release_date).getFullYear();
          return year <= start && year >= end;
        });
      }
    }

    if (selectedCategory) {
      filtered = filtered.filter(movie => movie.category === selectedCategory);
    }

    if (selectedGenre) {
      filtered = filtered.filter(movie =>
        Array.isArray(movie.genres) && movie.genres.includes(selectedGenre)
      );
    }

    if (sortOption === 'score-desc') {
      filtered.sort((a, b) => b.score - a.score);
    } else if (sortOption === 'score-asc') {
      filtered.sort((a, b) => a.score - b.score);
    } else if (sortOption === 'date-desc') {
      filtered.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortOption === 'date-asc') {
      filtered.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    }

    setFilteredMovies(filtered);
  }, [sortOption, selectedYear, selectedCategory, selectedGenre, allMovies]);

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
    }, 600);
  };

  return (
    <section className="PopularMovies-container">
      <div className="sort-container">
        <h2 style={{ paddingTop: "10px" }}>Popular Movies</h2>
        <div className="filters-group">
          <div className="filter-group">
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Default Sort</option>
              <option value="score-desc">Highest Score</option>
              <option value="score-asc">Lowest Score</option>
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
            </select>
          </div>

          <div className="filter-group">
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="">All Dates</option>
              {yearRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="Streaming">Streaming</option>
              <option value="TV">On Tv</option>
            </select>
          </div>

          <div className="filter-group">
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
              <option value="">All Genres</option>
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.slice(0, visibleCount).map(movie => (
          <div className="movie-card" key={movie.id} onClick={() => setSelectedMovie(movie)}>
            <img src={movie.image} alt={movie.title} />
            <h4>{movie.title}</h4>
            <p>⭐ {movie.score}</p>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>

      {visibleCount < filteredMovies.length && (
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
                <p><strong>Main Actors:</strong> {selectedMovie.main_actors?.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PopularMovies;
