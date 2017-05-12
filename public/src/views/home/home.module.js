import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FlairModule } from '../../flair/flair.module';

const routes = [
    { path : '', component : HomeComponent }
];

class HomeModule {}

HomeModule.annotations = [
    new NgModule ( {
        declarations: [ HomeComponent ],
        imports: [ RouterModule.forChild ( routes ),
            CommonModule, FlairModule ]
    })
];

export default { HomeModule }