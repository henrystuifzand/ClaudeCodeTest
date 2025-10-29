const cds = require('@sap/cds');

class StarWarsService extends cds.ApplicationService {
    async init() {

        const { Films, Characters, Planets, Starships, Vehicles, Species } = this.entities;

        // Handler for READ Films - auto-populate from SWAPI if empty
        this.before('READ', Films, async (req) => {
            const count = await SELECT.one.from(Films).columns('count(*) as count');
            if (!count.count || count.count === 0) {
                console.log('No films found in database, syncing from SWAPI...');
                await this.syncFromSWAPI();
            }
        });

        // Handler for READ individual Film with related data
        this.on('READ', Films, async (req, next) => {
            const films = await next();
            return films;
        });

        // Action handler to sync data from SWAPI
        this.on('syncFromSWAPI', async (req) => {
            try {
                console.log('Starting SWAPI sync...');

                // Fetch all films from SWAPI
                const filmsResponse = await fetch('https://swapi.dev/api/films/');
                const filmsData = await filmsResponse.json();

                console.log(`Fetched ${filmsData.results.length} films from SWAPI`);

                // Process each film
                for (const filmData of filmsData.results) {
                    console.log(`Processing film: ${filmData.title}`);

                    // Create or update film
                    const filmId = this.generateId(filmData.url);
                    await UPSERT.into(Films).entries({
                        ID: filmId,
                        episodeId: filmData.episode_id,
                        title: filmData.title,
                        openingCrawl: filmData.opening_crawl,
                        director: filmData.director,
                        producer: filmData.producer,
                        releaseDate: filmData.release_date,
                        url: filmData.url
                    });

                    // Process characters
                    await this.processResources(filmData.characters, Characters, filmId, 'character');

                    // Process planets
                    await this.processResources(filmData.planets, Planets, filmId, 'planet');

                    // Process starships
                    await this.processResources(filmData.starships, Starships, filmId, 'starship');

                    // Process vehicles
                    await this.processResources(filmData.vehicles, Vehicles, filmId, 'vehicle');

                    // Process species
                    await this.processResources(filmData.species, Species, filmId, 'species');
                }

                console.log('SWAPI sync completed successfully');
                return 'Sync completed successfully';

            } catch (error) {
                console.error('Error syncing from SWAPI:', error);
                req.error(500, `Sync failed: ${error.message}`);
            }
        });

        return super.init();
    }

    // Helper function to generate consistent IDs from SWAPI URLs
    generateId(url) {
        const matches = url.match(/\/(\d+)\/$/);
        return matches ? matches[1] : url;
    }

    // Helper function to process and upsert resources
    async processResources(urls, entity, filmId, resourceType) {
        for (const url of urls) {
            try {
                const response = await fetch(url);
                const data = await response.json();

                const resourceId = this.generateId(url);
                const resourceData = {
                    ID: `${filmId}-${resourceId}`,
                    film_ID: filmId,
                    url: url
                };

                // Map fields based on resource type
                switch (resourceType) {
                    case 'character':
                        Object.assign(resourceData, {
                            name: data.name,
                            gender: data.gender,
                            birthYear: data.birth_year,
                            height: data.height,
                            mass: data.mass,
                            hairColor: data.hair_color,
                            skinColor: data.skin_color,
                            eyeColor: data.eye_color,
                            homeworld: data.homeworld
                        });
                        break;

                    case 'planet':
                        Object.assign(resourceData, {
                            name: data.name,
                            climate: data.climate,
                            terrain: data.terrain,
                            population: data.population,
                            diameter: data.diameter,
                            gravity: data.gravity,
                            rotationPeriod: data.rotation_period,
                            orbitalPeriod: data.orbital_period,
                            surfaceWater: data.surface_water
                        });
                        break;

                    case 'starship':
                        Object.assign(resourceData, {
                            name: data.name,
                            model: data.model,
                            manufacturer: data.manufacturer,
                            starshipClass: data.starship_class,
                            costInCredits: data.cost_in_credits,
                            length: data.length,
                            crew: data.crew,
                            passengers: data.passengers,
                            maxAtmospheringSpeed: data.max_atmosphering_speed,
                            hyperdriveRating: data.hyperdrive_rating,
                            MGLT: data.MGLT,
                            cargoCapacity: data.cargo_capacity,
                            consumables: data.consumables
                        });
                        break;

                    case 'vehicle':
                        Object.assign(resourceData, {
                            name: data.name,
                            model: data.model,
                            manufacturer: data.manufacturer,
                            vehicleClass: data.vehicle_class,
                            costInCredits: data.cost_in_credits,
                            length: data.length,
                            crew: data.crew,
                            passengers: data.passengers,
                            maxAtmospheringSpeed: data.max_atmosphering_speed,
                            cargoCapacity: data.cargo_capacity,
                            consumables: data.consumables
                        });
                        break;

                    case 'species':
                        Object.assign(resourceData, {
                            name: data.name,
                            classification: data.classification,
                            designation: data.designation,
                            averageHeight: data.average_height,
                            averageLifespan: data.average_lifespan,
                            language: data.language,
                            skinColors: data.skin_colors,
                            hairColors: data.hair_colors,
                            eyeColors: data.eye_colors,
                            homeworld: data.homeworld
                        });
                        break;
                }

                await UPSERT.into(entity).entries(resourceData);

            } catch (error) {
                console.error(`Error processing ${resourceType} from ${url}:`, error.message);
            }
        }
    }
}

module.exports = StarWarsService;
