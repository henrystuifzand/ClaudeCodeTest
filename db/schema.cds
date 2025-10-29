namespace starwars;

using { cuid, managed } from '@sap/cds/common';

entity Films : cuid {
    episodeId     : Integer;
    title         : String(100);
    openingCrawl  : LargeString;
    director      : String(100);
    producer      : String(200);
    releaseDate   : Date;

    // Associations to related entities
    characters    : Association to many Characters on characters.film = $self;
    planets       : Association to many Planets on planets.film = $self;
    starships     : Association to many Starships on starships.film = $self;
    vehicles      : Association to many Vehicles on vehicles.film = $self;
    species       : Association to many Species on species.film = $self;

    // SWAPI URL for reference
    url           : String(200);
}

entity Characters : cuid {
    name          : String(100);
    gender        : String(50);
    birthYear     : String(50);
    height        : String(20);
    mass          : String(20);
    hairColor     : String(50);
    skinColor     : String(50);
    eyeColor      : String(50);
    homeworld     : String(200);
    url           : String(200);

    // Back reference to film
    film          : Association to Films;
}

entity Planets : cuid {
    name          : String(100);
    climate       : String(100);
    terrain       : String(100);
    population    : String(50);
    diameter      : String(50);
    gravity       : String(50);
    rotationPeriod : String(50);
    orbitalPeriod : String(50);
    surfaceWater  : String(50);
    url           : String(200);

    // Back reference to film
    film          : Association to Films;
}

entity Starships : cuid {
    name          : String(100);
    model         : String(100);
    manufacturer  : String(200);
    starshipClass : String(100);
    costInCredits : String(50);
    length        : String(50);
    crew          : String(50);
    passengers    : String(50);
    maxAtmospheringSpeed : String(50);
    hyperdriveRating : String(50);
    MGLT          : String(50);
    cargoCapacity : String(50);
    consumables   : String(50);
    url           : String(200);

    // Back reference to film
    film          : Association to Films;
}

entity Vehicles : cuid {
    name          : String(100);
    model         : String(100);
    manufacturer  : String(200);
    vehicleClass  : String(100);
    costInCredits : String(50);
    length        : String(50);
    crew          : String(50);
    passengers    : String(50);
    maxAtmospheringSpeed : String(50);
    cargoCapacity : String(50);
    consumables   : String(50);
    url           : String(200);

    // Back reference to film
    film          : Association to Films;
}

entity Species : cuid {
    name          : String(100);
    classification : String(100);
    designation   : String(100);
    averageHeight : String(50);
    averageLifespan : String(50);
    language      : String(100);
    skinColors    : String(200);
    hairColors    : String(200);
    eyeColors     : String(200);
    homeworld     : String(200);
    url           : String(200);

    // Back reference to film
    film          : Association to Films;
}
