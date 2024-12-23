import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    
    {
        path: 'game',
        component: GameComponent,
         title: 'Memory Game' 
    },
    {
        path:'about',
        component: AboutComponent,
        title: 'About the game'
    }
];
