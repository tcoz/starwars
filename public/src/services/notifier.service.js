const Notes = {
    CHARACTERS_AVAILABLE : 'characters_available',
    FILMS_AVAILABLE : 'films_available',
    CHARACTER_SELECTED : 'character_selected',
    FILM_SELECTED : 'film_selected',
    SHOW_POPUP : 'show_popup'
};

class Note {
    constructor ( name = '', data = {} ) {
        this.name = name;
        this.data = data;
    }
}

// Example of a subscription/notification style service,
// as opposed to a service that just calls a callback
// (like StarWarsService).
class NotifierService {

    constructor() {
        let Rx = require ( 'rxjs' );
        this.subject = new Rx.Subject ( );
    }

    subscribe ( callback ) {
        return this.subject.subscribe ( b => callback ( b ) );
    }

    sendNote ( note ) {
        this.subject.next ( note );
    }
}
export { NotifierService, Notes, Note }
