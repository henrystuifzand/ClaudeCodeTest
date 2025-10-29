using StarWarsService as service from '../../srv/starwars-service';

annotate service.Films with @(
    UI.SelectionFields: [
        episodeId,
        title,
        director
    ],
    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Value: episodeId,
            Label: 'Episode'
        },
        {
            $Type: 'UI.DataField',
            Value: title,
            Label: 'Title'
        },
        {
            $Type: 'UI.DataField',
            Value: director,
            Label: 'Director'
        },
        {
            $Type: 'UI.DataField',
            Value: producer,
            Label: 'Producer'
        },
        {
            $Type: 'UI.DataField',
            Value: releaseDate,
            Label: 'Release Date'
        }
    ],
    UI.HeaderInfo: {
        TypeName: 'Film',
        TypeNamePlural: 'Films',
        Title: {
            $Type: 'UI.DataField',
            Value: title
        },
        Description: {
            $Type: 'UI.DataField',
            Value: director
        }
    },
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            Label: 'Overview',
            Target: '@UI.FieldGroup#Overview'
        },
        {
            $Type: 'UI.ReferenceFacet',
            Label: 'Characters',
            Target: 'characters/@UI.LineItem'
        },
        {
            $Type: 'UI.ReferenceFacet',
            Label: 'Planets',
            Target: 'planets/@UI.LineItem'
        },
        {
            $Type: 'UI.ReferenceFacet',
            Label: 'Starships',
            Target: 'starships/@UI.LineItem'
        },
        {
            $Type: 'UI.ReferenceFacet',
            Label: 'Vehicles',
            Target: 'vehicles/@UI.LineItem'
        },
        {
            $Type: 'UI.ReferenceFacet',
            Label: 'Species',
            Target: 'species/@UI.LineItem'
        }
    ],
    UI.FieldGroup#Overview: {
        Data: [
            {
                $Type: 'UI.DataField',
                Value: episodeId,
                Label: 'Episode ID'
            },
            {
                $Type: 'UI.DataField',
                Value: director,
                Label: 'Director'
            },
            {
                $Type: 'UI.DataField',
                Value: producer,
                Label: 'Producer'
            },
            {
                $Type: 'UI.DataField',
                Value: releaseDate,
                Label: 'Release Date'
            },
            {
                $Type: 'UI.DataField',
                Value: openingCrawl,
                Label: 'Opening Crawl'
            }
        ]
    }
);

annotate service.Characters with @(
    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Value: name,
            Label: 'Name'
        },
        {
            $Type: 'UI.DataField',
            Value: gender,
            Label: 'Gender'
        },
        {
            $Type: 'UI.DataField',
            Value: birthYear,
            Label: 'Birth Year'
        },
        {
            $Type: 'UI.DataField',
            Value: height,
            Label: 'Height'
        },
        {
            $Type: 'UI.DataField',
            Value: mass,
            Label: 'Mass'
        }
    ]
);

annotate service.Planets with @(
    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Value: name,
            Label: 'Name'
        },
        {
            $Type: 'UI.DataField',
            Value: climate,
            Label: 'Climate'
        },
        {
            $Type: 'UI.DataField',
            Value: terrain,
            Label: 'Terrain'
        },
        {
            $Type: 'UI.DataField',
            Value: population,
            Label: 'Population'
        },
        {
            $Type: 'UI.DataField',
            Value: diameter,
            Label: 'Diameter'
        }
    ]
);

annotate service.Starships with @(
    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Value: name,
            Label: 'Name'
        },
        {
            $Type: 'UI.DataField',
            Value: model,
            Label: 'Model'
        },
        {
            $Type: 'UI.DataField',
            Value: manufacturer,
            Label: 'Manufacturer'
        },
        {
            $Type: 'UI.DataField',
            Value: starshipClass,
            Label: 'Class'
        },
        {
            $Type: 'UI.DataField',
            Value: costInCredits,
            Label: 'Cost'
        }
    ]
);

annotate service.Vehicles with @(
    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Value: name,
            Label: 'Name'
        },
        {
            $Type: 'UI.DataField',
            Value: model,
            Label: 'Model'
        },
        {
            $Type: 'UI.DataField',
            Value: manufacturer,
            Label: 'Manufacturer'
        },
        {
            $Type: 'UI.DataField',
            Value: vehicleClass,
            Label: 'Class'
        },
        {
            $Type: 'UI.DataField',
            Value: costInCredits,
            Label: 'Cost'
        }
    ]
);

annotate service.Species with @(
    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Value: name,
            Label: 'Name'
        },
        {
            $Type: 'UI.DataField',
            Value: classification,
            Label: 'Classification'
        },
        {
            $Type: 'UI.DataField',
            Value: designation,
            Label: 'Designation'
        },
        {
            $Type: 'UI.DataField',
            Value: averageHeight,
            Label: 'Average Height'
        },
        {
            $Type: 'UI.DataField',
            Value: language,
            Label: 'Language'
        }
    ]
);
