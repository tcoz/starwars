import { Component, EventEmitter } from '@angular/core';

class FilmsListItemComponent {

    constructor () {
        this.data = {};
        this.emitter = new EventEmitter ();
    }

    onClick ( obj ) {
        this.emitter.next ( obj );
    }

    // Typically put something like this in a util
    processDate ( ) {
        let days = [ 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday', 'Sunday' ];
        let date = new Date ( this.data.release_date ).toDateString ( );
        let split = date.split ( ' ' );
        let fullday = days.filter ( x => x.indexOf ( split [ 0 ] ) !== -1 );
        return `${fullday}, ${split [ 1 ]} ${ split [ 2 ]} ${split [ 3 ]}`;
    }
}

FilmsListItemComponent.annotations = [
    new Component ( {
        selector: 'films-list-item',
        styleUrls: [ 'public/src/flair/filmslist/filmslist.component.css' ],
        inputs: [ 'data' ],
        outputs: [ 'emitter' ],
        template: `
            <div class="list_item"
                 (click)="onClick ( obj )">
                 <div class="title_bg">Title: {{ data.title }}</div>
                 <div class="release_bg">Released: {{ processDate ( ) }}</div>
            </div>
        `
    } )
];
export { FilmsListItemComponent }