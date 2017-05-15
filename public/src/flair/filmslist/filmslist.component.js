import { Component } from '@angular/core';
import { NotifierService, Notes, Note } from '../../services/notifier.service';
import { StarWarsService, Status } from '../../services/starwars.service';

// Sort of a strategy-thing
const Sorts = {
    DATE_DESCENDING : ( ( a, b ) =>
        new Date ( b.release_date ) - new Date ( a.release_date ) ),
    DATE_ASCENDING : ( ( a, b ) =>
        new Date ( a.release_date ) - new Date ( b.release_date ) ),
    TITLE_DESCENDING : ( ( a, b ) => b.title > a.title ),
    TITLE_ASCENDING : ( ( a, b ) => a.title > b.title )
};

class FilmsListComponent {

    static get parameters ( ) {
        return [ NotifierService, StarWarsService ];
    }

    constructor ( notifierService, starWarsService ) {
        this.noteSvc = notifierService;
        this.starWarsSvc = starWarsService;
        this.films = [ ];
        this.date_ascending = true;
        this.title_ascending = true;
    }

    ngOnInit ( ) {
        this.sub = this.noteSvc.subscribe ( x => this.onNotifier ( x ) );
    }

    ngOnDestroy ( ) {
        if ( this.sub ) {
            this.sub.unsubscribe ( );
        }
    }

    onStarWarsService ( note ) {
        this.films = Array.isArray ( note.data ) ? note.data : [];
        this.sortFilms ( 'title' );
        if ( note.data === Status.ERROR ) {
            this.noteSvc.sendNote (
                new Note ( Notes.SHOW_POPUP, 'Could not get film data!' ) );
        }
    }

    // When the character list broadcasts a char click,
    // It's heard via the sub/notify service.
    // Could be done by going all the way up/down the view hierarchy,
    // or by navigating parent/childs, this is much more
    // decoupled and higher performance (no bubbling/propagating, etc).
    onNotifier ( note ) {
        if ( note.name === Notes.CHARACTER_SELECTED ) {
            this.starWarsSvc.transactData (
                note.data.url, Notes.FILMS_AVAILABLE,
                x => this.onStarWarsService ( x ) );
        }
    }

    onEmitter ( obj ) {
        this.noteSvc.sendNote ( new Note ( Notes.FILM_SELECTED, obj ) );
    }

    sortFilms ( type ) {
        let func = ( type === 'title' ?
            ( this.title_ascending ?
                Sorts.TITLE_DESCENDING : Sorts.TITLE_ASCENDING ) :
            ( this.date_ascending ?
                Sorts.DATE_DESCENDING : Sorts.DATE_ASCENDING ) );

        if ( type === 'title' ) {
            this.title_ascending = !this.title_ascending;
        } else {
            this.date_ascending = !this.date_ascending;
        }

        this.films.sort ( func );
    }
}

FilmsListComponent.annotations = [
    new Component ( {
        selector: 'films-list',
        templateUrl: require ( './filmslist.component.html' ),
        styleUrls: [ 'assets/css/filmslist.component.css' ]
    } )
];
export { FilmsListComponent }