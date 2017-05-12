import { Component } from '@angular/core';

class AppComponent {
    constructor () {}
}

AppComponent.annotations = [

    new Component({
        selector: "sample-app",
        templateUrl: require ( './app.component.html' )
    })
];

export { AppComponent };