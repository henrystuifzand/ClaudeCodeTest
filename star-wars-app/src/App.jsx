import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmsList from './components/FilmsList';
import FilmDetail from './components/FilmDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<FilmsList />} />
          <Route path="/film/:id" element={<FilmDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
