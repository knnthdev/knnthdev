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
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: HomeComponent.projects[0].link,
        component: Layout1Component
    },
    {
        path: HomeComponent.projects[1].link,
        component: Layout2Component
    },
    {
        path: HomeComponent.projects[2].link,
        component: Layout3Component
    },
    {
        path: HomeComponent.projects[3].link,
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
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    }
];
