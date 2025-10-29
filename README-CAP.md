# Star Wars Films - SAP Cloud Application Programming Model

A comprehensive Star Wars Films application built with the SAP Cloud Application Programming Model (CAP), featuring integration with the Star Wars API (SWAPI) and a modern Fiori Elements UI.

## Overview

This application demonstrates enterprise-grade architecture using SAP CAP to create a rich data browsing experience for Star Wars films and related entities including characters, planets, starships, vehicles, and species.

## Architecture

### Technology Stack

- **SAP CAP Framework**: Core application framework
- **CDS (Core Data Services)**: Data modeling and service definitions
- **OData V4**: RESTful API protocol
- **SQLite**: Local database for development
- **Fiori Elements**: Enterprise UI framework
- **Node.js**: Runtime environment

### Project Structure

```
starwars-cap-app/
├── db/
│   └── schema.cds              # Data models (Films, Characters, Planets, etc.)
├── srv/
│   ├── starwars-service.cds    # OData service definitions
│   └── starwars-service.js     # Custom service handlers & SWAPI integration
├── app/
│   └── films/
│       ├── annotations.cds     # UI annotations for Fiori Elements
│       └── webapp/
│           ├── manifest.json   # App configuration
│           ├── index.html      # Entry point
│           └── i18n/          # Internationalization
├── package.json               # Dependencies and scripts
└── .cdsrc.json               # CAP configuration
```

## Features

### Data Model

The application includes comprehensive CDS entities:

- **Films**: Episode details, opening crawl, director, producer, release date
- **Characters**: Name, gender, physical attributes, homeworld
- **Planets**: Climate, terrain, population, diameter, gravity
- **Starships**: Model, manufacturer, class, specifications
- **Vehicles**: Model, manufacturer, class, specifications
- **Species**: Classification, designation, physical attributes

All entities include proper associations for relational navigation.

### Service Layer

**StarWarsService** provides:
- Read-only OData V4 endpoints for all entities
- Automatic data synchronization from SWAPI
- Custom action `syncFromSWAPI()` for manual refresh
- Lazy loading with auto-population on first access

### UI Features

Built with SAP Fiori Elements:
- **List Report**: Browse all films with sorting and filtering
- **Object Page**: Detailed film view with tabbed navigation
- **Facets**: Separate tabs for characters, planets, starships, vehicles, species
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Enterprise Theming**: SAP Horizon theme

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- SAP CAP Development Kit (optional but recommended)

### Setup

1. Install dependencies:
```bash
npm install
```

2. Deploy the database schema:
```bash
npm run build
```

## Running the Application

### Development Mode

Start the application with hot-reload:
```bash
npm run watch
```

This will:
- Start the CAP server on http://localhost:4004
- Deploy the SQLite database
- Watch for file changes and auto-reload

### Production Mode

Start the application in production:
```bash
npm start
```

## Using the Application

### Access Points

Once running, access:

1. **Fiori Launchpad**: http://localhost:4004
2. **Films App**: http://localhost:4004/films/webapp/
3. **OData Service**: http://localhost:4004/odata/v4/star-wars-service/
4. **API Metadata**: http://localhost:4004/odata/v4/star-wars-service/$metadata

### First Run

On first access, the application automatically:
1. Detects empty database
2. Fetches all films from SWAPI
3. Downloads related entities (characters, planets, etc.)
4. Populates the local database
5. Displays the data

This may take a minute as it fetches data from the public SWAPI API.

### Manual Sync

To refresh data from SWAPI:
```bash
POST http://localhost:4004/odata/v4/star-wars-service/syncFromSWAPI
```

## Data Flow

```
User Request → CAP Service Layer → Check Database → Empty?
                                         ↓ Yes
                                    Fetch SWAPI
                                         ↓
                                   Populate DB
                                         ↓
                                   Return Data
```

## Key Components

### Custom Service Handler (srv/starwars-service.js)

The service handler implements:
- **Auto-sync logic**: Checks if database is empty before READ operations
- **SWAPI integration**: Fetches data from https://swapi.dev/api
- **Data transformation**: Maps SWAPI response to CDS entities
- **Resource processing**: Parallel fetching of related entities
- **ID generation**: Creates consistent IDs from SWAPI URLs

### UI Annotations (app/films/annotations.cds)

Defines:
- List views for each entity
- Field labels and formatting
- Object page layout with facets
- Selection fields for filtering

## API Endpoints

### Query Films
```
GET /odata/v4/star-wars-service/Films
GET /odata/v4/star-wars-service/Films?$expand=characters,planets
GET /odata/v4/star-wars-service/Films(1)
```

### Query Related Entities
```
GET /odata/v4/star-wars-service/Characters
GET /odata/v4/star-wars-service/Planets
GET /odata/v4/star-wars-service/Starships
GET /odata/v4/star-wars-service/Vehicles
GET /odata/v4/star-wars-service/Species
```

### OData Features Supported
- `$expand`: Load related entities
- `$select`: Choose specific fields
- `$filter`: Filter results
- `$orderby`: Sort results
- `$top` / `$skip`: Pagination

## Deployment

### SAP Business Technology Platform (BTP)

1. Build for production:
```bash
npm run build
```

2. Deploy to Cloud Foundry:
```bash
cf push
```

### Docker

Create a Dockerfile:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4004
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t starwars-cap .
docker run -p 4004:4004 starwars-cap
```

## Development

### Adding New Entities

1. Define entity in `db/schema.cds`
2. Add projection in `srv/starwars-service.cds`
3. Implement handler logic in `srv/starwars-service.js`
4. Add UI annotations in `app/films/annotations.cds`

### Customizing UI

Modify `app/films/annotations.cds` to change:
- Field visibility and order
- Table columns
- Form layouts
- Facet arrangement

## Troubleshooting

### Database Issues
Delete the SQLite database and restart:
```bash
rm db.sqlite
npm run watch
```

### SWAPI Connection Issues
Check internet connectivity and SWAPI status at https://swapi.dev

### UI Not Loading
Clear browser cache or try incognito mode

## Comparison with React Version

| Feature | React App | SAP CAP App |
|---------|-----------|-------------|
| Architecture | Client-side SPA | Enterprise full-stack |
| Data Storage | None (API only) | SQLite/HANA database |
| API | Direct SWAPI calls | OData V4 service |
| UI Framework | React + Custom CSS | Fiori Elements |
| Scalability | Limited | Enterprise-grade |
| Backend Logic | None | Full service layer |
| Data Caching | Browser only | Server-side database |
| Authentication | None | Ready for BTP auth |

## License

ISC

## Resources

- [SAP CAP Documentation](https://cap.cloud.sap)
- [Fiori Elements Guide](https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html)
- [SWAPI Documentation](https://swapi.dev)
