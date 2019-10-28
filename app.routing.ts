import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

//lazy routing with selective preloading
const appRoutes: Routes = [    
    {
        path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',
        data: { preload: true, preloadFor: ['games'] }
    },
    {
        path: 'games', loadChildren: './games/games.module#GamesModule',
        data: { preload: true, preloadFor: ['profile', 'dashboard'] }
    },
    {
        path: 'profile', loadChildren: './profile/profile.module#ProfileModule',
        data: { preload: true, preloadFor: ['games', 'dashboard'] }
    },
    {
        path: 'someRarelyVisitedRoute', loadChildren: './rare/rare.module#RareModule'
    },
    {
        path: '**', redirectTo: 'dashboard/1/1', pathMatch: 'full'
    }  
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                preloadingStrategy: SelectivePreloadingStrategy,
            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        SelectivePreloadingStrategy
    ]
})
export class AppRoutingModule { }