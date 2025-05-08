import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';

import { Layout1Component } from './routes/projects/layout1/layout1.component';
import { Layout2Component } from './routes/projects/layout2/layout2.component';
import { Layout3Component } from './routes/projects/layout3/layout3.component';
import { Layout4Component } from './routes/projects/layout4/layout4.component';
import { ContactComponent } from './routes/forms/contact/contact.component';
import { CVComponent } from './routes/forms/cv/cv.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'id01',
        component: Layout1Component
    },
    {
        path: 'id02',
        component: Layout2Component
    },
    {
        path: 'id03',
        component: Layout3Component
    },
    {
        path: 'id04',
        component: Layout4Component
    },
    {
        path: 'contact-me',
        component: ContactComponent
    },
    {
        path: 'cv',
        component: CVComponent
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    // {
    //     path: '**',
    //     redirectTo: '404',
    //     pathMatch: 'full'
    // }
];
