import { Http } from '@angular/http';
import { NotifierService, Notes, Note } from './notifier.service';

const JSON_ROOT = 'assets/json/';

const JsonTypes = {
    CHARACTERS : 'characters'
};

// Could be useful to type the incoming json objects
class Character {
    constructor ( data ) {
        this.name = !!data.name ? data.name : 'no_name_provided';
        this.url = !!data.url ? data.url : 'no_url_provided';
    }
}

class JsonDataService {
    static get parameters ( ) {
        return [ Http, NotifierService ];
    }

    constructor ( http, notifierService ) {
        this.http = http;
        this.noteSvc = notifierService;
        this.cache = {};
    }

    /**
     * @param jsontype - the kind of data to refresh and return.
     * @param usecache - user doesn't require latest data, we'll be optimistic.
     */
    refreshData ( jsontype = '', usecache = true ) {
        // Won't spend too much time in the sample catching errors,
        // but here's an example of validating incoming data, etc.
        // Might return some kind of Option<T> or non-null value if needed.
        if ( ! this.validateType ( jsontype ) ) {
            console.error ( `Submitted type of "${jsontype}" is invalid.` );
            return;
        }

        if ( usecache && jsontype in this.cache ) {
            this.noteSvc.sendNote (
                new Note ( Notes.CHARACTERS_AVAILABLE,
                    [].concat ( this.cache [ 0 ] ) ) );
        } else {
            let filename = this.buildFileName ( jsontype );
            this.makeJsonRequest ( filename, Notes.CHARACTERS_AVAILABLE, jsontype );
        }
    }

    // For the sample, we already know the type is valid for these three functions.
    // Otherwise would make more robust for testing, etc.
    buildFileName ( type ) {
        return JSON_ROOT + type + '.json';
    }

    validateType ( type ) {
        let test = Object.keys ( JsonTypes )
            .filter ( x => JsonTypes [ x ] === type );
        // There should only be one match, otherwise something's wrong.
        return test.length === 1;
    }

    typeJson ( type = '', json = [] ) {
        let typed_json = [];
        switch ( type ) {
            case JsonTypes.CHARACTERS:
                typed_json = json.map ( x => new Character ( x ) );
                break;
            default:
                typed_json = [];
        }

        return typed_json;
    }

    /**
     * @param filename - The file to request
     * @param note - The notification to broadcast when the data is ready
     * @param type - What cache object to load the data into.
     */
    makeJsonRequest ( filename, note, type ) {
        this.http.get( filename )
            .map ( resp => {
            return resp.json ()
        })
        .subscribe (
                ( x ) =>
                {
                    let typed = this.typeJson ( type, x [ type ] );
                    this.cache [ type ] = typed;
                    this.noteSvc.sendNote (
                        new Note ( note, [].concat ( typed ) ) );
                },
                ( err ) => {
                    console.error ( err );
                    // Always return something so the UI doesn't just die.
                    // This is a little naive but does the trick here.
                    this.noteSvc.sendNote ( new Note ( note, [] ) );
                }
        );
    }
}
export { JsonDataService, JsonTypes }