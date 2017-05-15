import { Http } from '@angular/http';
import { Notes, Note } from './notifier.service';
import 'rxjs/add/operator/map';

// For two-project dev, kick over to localhost, otherwise leave it alone.
const domain = window.location.hostname === 'localhost' ? 'http://localhost:8888/' : '';
const Operations = {
    NO_OP : 'home',
    GET_FILMS : ( domain + 'savereview' )
};

const Status = {
    OK : 'ok',
    ERROR : 'error'
};

// Would probably put this in a DataTypes module or something
class Film {
    static get displayProperties ( ) {
        return [ 'title', 'producer', 'director', 'created', 'release_date', 'edited', 'opening_crawl' ];
    }

    constructor ( data = {} ) {
        // add some semi-robust default arg checking etc.
        // may not typically do this. Note that "data.characters || val"
        // would crash if !data.
        this.characters = !!data.characters ? data.characters : [];
        this.created = !!data.created ? data.created : '';
        this.director = !!data.director ? data.director : '';
        this.edited = !!data.edited ? data.edited : '';
        this.episode_id = !!data.episode_id ? data.episode_id : 0;
        this.opening_crawl = !!data.opening_crawl ? data.opening_crawl : '';
        this.planets = !!data.planets ? data.planets : [];
        this.producer = !!data.producer ? data.producer : '';
        this.release_date = !!data.release_date ? data.release_date : '';
        this.species = !!data.species ? data.species : [];
        this.starships = !!data.startships ? data.starships : [];
        this.title = !!data.title ? data.title : '';
        this.url = !!data.url ? data.url : '';
        this.vehicles = !!data.vehicles ? data.vehicles : [];
    }
}

// Example of a service that sends data to a callback,
// as opposed to a subscription/notification service
// (like NotifierService).
class StarWarsService {

    static get parameters ( ) {
        return [ Http ]
    }

    constructor ( http ) {
        this.http = http;
    }

    /**
     * @param operation: a value from the exported Operations const
     * @param response_note: the note that will be broadcast (recipient should switch on it)
     * @param data: the payload (will typically be { status : 'ok|error', data : [err|message] }
     * @param callback: the callback that will receive the payload
     */
    transactData ( operation, response_note, callback ) {

        // Some rxjs stuff here,
        // Angular 2 builds a lot of it right in.
        let svc = this.http.get( operation )
            .map ( resp => resp.json () );

        svc.subscribe (
            ( x ) => {
                if ( response_note === Notes.FILMS_AVAILABLE ) {
                    if ( ! ( !!x.films && Array.isArray ( x.films ) ) ) {
                        throw new Error ( 'Incoming Films data did not appear to be an array!' );
                    }

                    let typed_films = [];
                    // Fire off all the calls with observers.
                    x.films.forEach ( name => {
                        this.http.get ( name )
                            .map ( resp => resp.json ( ) )
                            .subscribe( ( y ) => {
                                typed_films.push ( y );
                                if ( typed_films.length === x.films.length ) {
                                    typed_films = typed_films.map ( film => new Film ( film ) );
                                    callback ( new Note ( response_note, typed_films ) );
                                }
                            } );
                    });
                }
            },
            ( err ) => {
                //TODO: Might want to log this or some such
                console.error ( 'StarwarsService Error!', err );
                callback ( new Note ( response_note, Status.ERROR ) );
            },
            ( ) => console.info ( 'StarwarsService Complete' )
        );
    }
}
export { StarWarsService, Operations, Status, Film }
