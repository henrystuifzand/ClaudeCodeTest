import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { fetchFilms, fetchMultipleResources } from '../services/api';
import ResourceList from './ResourceList';
import './FilmDetail.css';

const FilmDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [film, setFilm] = useState(location.state?.film || null);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadFilmData = async () => {
      try {
        setLoading(true);

        // If film data wasn't passed through state, fetch it
        let filmData = film;
        if (!filmData) {
          const films = await fetchFilms();
          filmData = films.find(f => f.episode_id === parseInt(id));
          setFilm(filmData);
        }

        if (!filmData) {
          throw new Error('Film not found');
        }

        // Fetch all related resources
        const [charactersData, planetsData, starshipsData, vehiclesData, speciesData] = await Promise.all([
          fetchMultipleResources(filmData.characters),
          fetchMultipleResources(filmData.planets),
          fetchMultipleResources(filmData.starships),
          fetchMultipleResources(filmData.vehicles),
          fetchMultipleResources(filmData.species)
        ]);

        setCharacters(charactersData);
        setPlanets(planetsData);
        setStarships(starshipsData);
        setVehicles(vehiclesData);
        setSpecies(speciesData);
        setError(null);
      } catch (err) {
        setError('Failed to load film details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFilmData();
  }, [id, film]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading film details...</p>
      </div>
    );
  }

  if (error || !film) {
    return (
      <div className="error-container">
        <p className="error-message">{error || 'Film not found'}</p>
        <Link to="/" className="back-button">Back to Films</Link>
      </div>
    );
  }

  return (
    <div className="film-detail-container">
      <Link to="/" className="back-button">← Back to Films</Link>

      <div className="film-header">
        <div className="episode-badge-large">Episode {film.episode_id}</div>
        <h1 className="film-title-large">{film.title}</h1>
        <div className="film-meta">
          <span>Directed by {film.director}</span>
          <span>•</span>
          <span>Produced by {film.producer}</span>
          <span>•</span>
          <span>Released {film.release_date}</span>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'characters' ? 'active' : ''}`}
          onClick={() => setActiveTab('characters')}
        >
          Characters ({characters.length})
        </button>
        <button
          className={`tab ${activeTab === 'planets' ? 'active' : ''}`}
          onClick={() => setActiveTab('planets')}
        >
          Planets ({planets.length})
        </button>
        <button
          className={`tab ${activeTab === 'starships' ? 'active' : ''}`}
          onClick={() => setActiveTab('starships')}
        >
          Starships ({starships.length})
        </button>
        <button
          className={`tab ${activeTab === 'vehicles' ? 'active' : ''}`}
          onClick={() => setActiveTab('vehicles')}
        >
          Vehicles ({vehicles.length})
        </button>
        <button
          className={`tab ${activeTab === 'species' ? 'active' : ''}`}
          onClick={() => setActiveTab('species')}
        >
          Species ({species.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="opening-crawl">
              <h2>Opening Crawl</h2>
              <p className="crawl-text">{film.opening_crawl}</p>
            </div>
          </div>
        )}

        {activeTab === 'characters' && (
          <ResourceList
            resources={characters}
            type="character"
            fields={['name', 'gender', 'birth_year', 'height', 'mass']}
          />
        )}

        {activeTab === 'planets' && (
          <ResourceList
            resources={planets}
            type="planet"
            fields={['name', 'climate', 'terrain', 'population', 'diameter']}
          />
        )}

        {activeTab === 'starships' && (
          <ResourceList
            resources={starships}
            type="starship"
            fields={['name', 'model', 'manufacturer', 'starship_class', 'cost_in_credits']}
          />
        )}

        {activeTab === 'vehicles' && (
          <ResourceList
            resources={vehicles}
            type="vehicle"
            fields={['name', 'model', 'manufacturer', 'vehicle_class', 'cost_in_credits']}
          />
        )}

        {activeTab === 'species' && (
          <ResourceList
            resources={species}
            type="species"
            fields={['name', 'classification', 'designation', 'average_height', 'language']}
          />
        )}
      </div>
    </div>
  );
};

export default FilmDetail;
