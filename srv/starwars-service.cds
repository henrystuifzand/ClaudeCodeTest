using starwars from '../db/schema';

service StarWarsService {

    @readonly
    entity Films as projection on starwars.Films;

    @readonly
    entity Characters as projection on starwars.Characters;

    @readonly
    entity Planets as projection on starwars.Planets;

    @readonly
    entity Starships as projection on starwars.Starships;

    @readonly
    entity Vehicles as projection on starwars.Vehicles;

    @readonly
    entity Species as projection on starwars.Species;

    // Custom action to sync data from SWAPI
    action syncFromSWAPI() returns String;
}
