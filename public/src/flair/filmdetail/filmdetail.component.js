import { Component } from '@angular/core';
import { Film } from '../../services/starwars.service';
import { NotifierService, Notes } from '../../services/notifier.service';

class FilmDetailComponent {

    static get parameters ( ) {
        return [ NotifierService ];
    }

    constructor ( notifierService ) {
        this.noteSvc = notifierService;
        this.data = {};
        this.display_properties = [];
    }

    ngOnInit ( ) {
        this.sub = this.noteSvc.subscribe ( x => this.onNotifier ( x ) );
    }

    ngOnDestroy ( ) {
        if ( this.sub ) {
            this.sub.unsubscribe ( );
        }
    }

    onNotifier ( note ) {
        if ( note.name === Notes.FILM_SELECTED ) {
            this.data = note.data;
            this.data.created = new Date ( this.data.created ).toLocaleDateString();
            this.data.released = new Date ( this.data.released ).toLocaleDateString();
            this.data.edited = new Date ( this.data.edited ).toLocaleDateString();
            this.display_properties = Film.displayProperties;
        }
    }
}

FilmDetailComponent.annotations = [
    new Component ( {
        selector: 'film-detail',
        templateUrl: require ( './filmdetail.component.html' ),
        styleUrls: [ 'public/src/flair/filmdetail/filmdetail.component.css' ]
    } )
];
export { FilmDetailComponent }