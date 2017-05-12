import { Component, ViewChild, EventEmitter } from '@angular/core';

class CharacterListItemComponent {

    constructor () {
        this.data = {};
        this.emitter = new EventEmitter ( );
    }

    ngOnInit ( ) {
        let charpics = [ 'luke', 'darth', 'obi', 'r2-d2' ];
        let name = this.data.name.toLowerCase ( );
        let pic = charpics.find ( x => name.indexOf ( x ) !== -1 );
        this.icon.nativeElement.src = 'assets/images/' + pic + '.jpg';
    }

    onClick ( obj ) {
        this.emitter.next ( obj );
    }
}

CharacterListItemComponent.annotations = [
    new Component ( {
        selector: 'character-list-item',
        styleUrls: [ 'public/src/flair/characterlist/characterlist.component.css' ],
        inputs: [ 'data' ],
        outputs: [ 'emitter' ],
        queries: {
            icon : new ViewChild ( 'icon' )
        },
        template: `
            <div class="list_item"
                 (click)="onClick ( data )">
                <table>
                    <tr>
                        <td class="icon_sizer">
                            <img #icon 
                                 class="icon_style" 
                                 src="assets/images/blank.jpg" />
                        </td>
                        <td class="icon_name">
                            {{ data.name }}
                        </td>
                    </tr>
                </table>
            </div>
        `
    } )
];
export { CharacterListItemComponent }