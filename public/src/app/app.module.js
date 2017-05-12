import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './pagenotfound.component';
import { FlairModule } from '../flair/flair.module';

// Top level services for sample, might put in separate module.
import { JsonDataService } from '../services/jsondata.service';
import { NotifierService } from '../services/notifier.service';
import { StarWarsService } from '../services/starwars.service';

class AppModule {
    constructor() {}
}

/**
 * Why the LocationStrategy/HashLocationStrategy provider?
 * To avoid problems with HTML5 urls (which don't always seem to work).
 * This provider uses "old" hashtag URLs (which work everywhere).
 */

AppModule.annotations = [
    new NgModule({
        declarations: [
            AppComponent,
            PageNotFoundComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            HttpModule,
            FlairModule
        ],
        providers: [
            { provide: LocationStrategy, useClass: HashLocationStrategy },
            JsonDataService, NotifierService, StarWarsService
        ],
        exports: [ AppRoutingModule ],
        bootstrap: [ AppComponent ]
    })
];

export { AppModule }