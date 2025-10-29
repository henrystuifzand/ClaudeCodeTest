import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFilms } from '../services/api';
import './FilmsList.css';

const FilmsList = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFilms = async () => {
      try {
        setLoading(true);
        const data = await fetchFilms();
        // Sort films by episode_id for chronological order
        const sortedFilms = data.sort((a, b) => a.episode_id - b.episode_id);
        setFilms(sortedFilms);
        setError(null);
      } catch (err) {
        setError('Failed to load films. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadFilms();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Star Wars films...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="films-list-container">
      <h1 className="main-title">Star Wars Films</h1>
      <div className="films-grid">
        {films.map((film) => (
          <Link
            key={film.episode_id}
            to={`/film/${film.episode_id}`}
            className="film-card"
            state={{ film }}
          >
            <div className="film-card-content">
              <div className="episode-badge">Episode {film.episode_id}</div>
              <h2 className="film-title">{film.title}</h2>
              <p className="film-director">Directed by {film.director}</p>
              <p className="film-release">Released: {film.release_date}</p>
              <p className="film-opening">{film.opening_crawl.substring(0, 150)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilmsList;
