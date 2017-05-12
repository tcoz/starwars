import { NgModule }              from '@angular/core';
import { RouterModule }          from '@angular/router';
import { PageNotFoundComponent } from './pagenotfound.component';

let getModule = ( name ) => {
    let req = null;
    if ( name === 'HomeModule' ) {
        req = require ( '../views/home/home.module' ).default [ name ];
    }

    if ( ! req ) {
        console.error ( 'No lazy load path found, going Home!', name );
        req = require ( '../views/home/home.module' ).default [ name ];
    }

    return req;
}

const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => getModule ( 'HomeModule' ) },
    { path: '**', component: PageNotFoundComponent }
];

class AppRoutingModule {
    constructor() {}
}

AppRoutingModule.annotations = [
    new NgModule({
        imports: [ RouterModule.forRoot(routes) ],
        exports: [ RouterModule ]
    })
];

export { AppRoutingModule }
