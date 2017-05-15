import { Component } from '@angular/core';

class HomeComponent {
}

HomeComponent.annotations = [
    new Component ( {
       templateUrl: require ( './home.component.html' ),
        styleUrls: [ 'assets/css/home.component.css' ]
    } )
];

export { HomeComponent }
