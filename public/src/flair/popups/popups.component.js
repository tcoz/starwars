import { Component } from '@angular/core';
import { NotifierService, Notes, Note } from '../../services/notifier.service';

class PopupsComponent {
    static get parameters ( ) {
        return [ NotifierService ];
    }

    constructor ( notifierService ) {
        this.noteSvc = notifierService;
        this.popup_style = this.showPopups ( false ); // default hidden
        this.message = '';
    }

    ngOnInit ( ) {
        // No need to destroy, popup component is persistent.
        this.sub = this.noteSvc.subscribe ( x => this.onNotifier ( x ) );
    }

    onNotifier ( note ) {
        if ( note.name === Notes.SHOW_POPUP ) {
            this.popup_style = this.showPopups ( !!note.data );
            this.message = note.data;
        }
    }

    showPopups ( show ) {
        // Prevent old message from flashing in new popup
        this.message = show ? this.message : '';
        return { display : ( show ? '' : 'none' ) };
    }

    onOkClick ( ) {
        this.noteSvc.sendNote ( new Note ( Notes.SHOW_POPUP, false ) );
    }
}

PopupsComponent.annotations = [
    new Component ( {
        selector: 'popups',
        templateUrl: require ( './popups.component.html' ),
        styleUrls: [ 'assets/css/popups.component.css' ]
    })
];

export { PopupsComponent }