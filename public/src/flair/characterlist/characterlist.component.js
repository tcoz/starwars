import { Component } from '@angular/core';
import { NotifierService, Notes, Note } from '../../services/notifier.service';
import { JsonDataService, JsonTypes } from '../../services/jsondata.service';

class CharacterListComponent {
    static get parameters ( ) {
        return [ JsonDataService, NotifierService ];
    }

    constructor ( jsonDataService, notifierService ) {
        this.jsonSvc = jsonDataService;
        this.noteSvc = notifierService;
        this.characters = [];
        this.selected_character = 'none';
    }

    ngOnInit ( ) {
        this.sub = this.noteSvc.subscribe ( x => this.onNotifier ( x ) );
        this.characters = this.jsonSvc.refreshData ( JsonTypes.CHARACTERS );
    }

    // Subscriptions do not auto-wipe!
    ngOnDestroy ( ) {
        if ( this.sub ) {
            this.sub.unsubscribe ( );
        }
    }

    onNotifier ( note ) {
        if ( note.name === Notes.CHARACTERS_AVAILABLE ) {
            this.characters = Array.isArray ( note.data ) ?
                note.data : this.characters;
        }
    }

    // This demos a trigger by a component parent/child "output",
    // as opposed to a sub/notify service or straight callback.
    onEmitter ( data ) {
        this.selected_character = data.name;
        this.noteSvc.sendNote ( new Note ( Notes.CHARACTER_SELECTED, data ) );
    }
}

CharacterListComponent.annotations = [
    new Component ( {
        selector: 'character-list',
        templateUrl: require ( './characterlist.component.html' ),
        styleUrls: [ 'public/src/flair/characterlist/characterlist.component.css' ]
    } )
];
export { CharacterListComponent }