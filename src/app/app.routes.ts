import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';

import { AppComponent } from './app.component';

export const routes: Routes = [
    
    {
        path: 'game',
        component: GameComponent,
         title: 'Memory Game' 
    }
];
