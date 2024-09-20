import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', loadChildren: () => import('./input-data/input-data.module').then(m => m.InputDataModule)
    }
];
