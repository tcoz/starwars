import { Component } from '@angular/core';

class HomeComponent {
}

HomeComponent.annotations = [
    new Component ( {
       templateUrl: require ( './home.component.html' ),
        styleUrls: [ 'public/src/views/home/home.component.css' ]
    } )
];

export { HomeComponent }
