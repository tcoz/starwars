import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './characterlist/characterlist.component';
import { CharacterListItemComponent } from './characterlist/characterlist-item.component';
import { FilmsListComponent } from './filmslist/filmslist.component';
import { FilmsListItemComponent } from './filmslist/filmslist-item.component';
import { FilmDetailComponent } from './filmdetail/filmdetail.component';
import { PopupsComponent } from './popups/popups.component';

// Here's an example of grouping several components into a module,
// as opposed to the way views like Home are handled.
// (see comment in HomeModule).
class FlairModule {
    constructor ( ) {}
}

FlairModule.annotations = [
    new NgModule ( {
        declarations: [ CharacterListComponent, CharacterListItemComponent,
            FilmsListComponent, FilmsListItemComponent, FilmDetailComponent,
            PopupsComponent ],
        imports: [ CommonModule ],
        exports: [ CharacterListComponent, CharacterListItemComponent,
            FilmsListComponent, FilmsListItemComponent, FilmDetailComponent,
            PopupsComponent ]
    } )
];
export { FlairModule }
