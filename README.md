# Star Wars Films App

A React application that displays Star Wars films and their details using the Star Wars API (SWAPI).

## Features

- **Films List**: Browse all Star Wars films sorted by episode number
- **Film Details**: View detailed information about each film including:
  - Opening crawl
  - Director and producer information
  - Release date
  - Characters, Planets, Starships, Vehicles, and Species from the film
- **Linked Resources**: Explore additional details about characters, planets, starships, vehicles, and species
- **Responsive Design**: Star Wars-themed dark UI with golden accents

## Technology Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **SWAPI** - Star Wars API (https://swapi.dev/api/films)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Navigate to the project directory:
```bash
cd star-wars-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit the URL shown in the terminal (typically http://localhost:5173)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
star-wars-app/
├── src/
│   ├── components/
│   │   ├── FilmsList.jsx          # Main films list component
│   │   ├── FilmsList.css
│   │   ├── FilmDetail.jsx         # Individual film details
│   │   ├── FilmDetail.css
│   │   ├── ResourceList.jsx       # Displays linked resources
│   │   └── ResourceList.css
│   ├── services/
│   │   └── api.js                 # API service for SWAPI
│   ├── App.jsx                    # Main app component with routing
│   ├── App.css
│   ├── index.css                  # Global styles
│   └── main.jsx                   # App entry point
└── package.json
```

## API Usage

This app uses the Star Wars API (SWAPI) to fetch:
- Film data from `https://swapi.dev/api/films`
- Linked resources (characters, planets, starships, etc.) using URLs from the film data

## Features Explained

### Films List Page
- Displays all 6 Star Wars films in chronological order (by episode)
- Shows episode number, title, director, release date, and opening crawl preview
- Click any film card to view full details

### Film Detail Page
- Full opening crawl text
- Tabbed interface for different resource types:
  - **Overview**: Film information and opening crawl
  - **Characters**: All characters featured in the film
  - **Planets**: Planets that appear in the film
  - **Starships**: Starships used in the film
  - **Vehicles**: Vehicles featured in the film
  - **Species**: Different species in the film
- Click on any resource card to expand and see additional details

## License

This project is open source and available for educational purposes.
