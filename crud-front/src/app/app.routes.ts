import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch:'full', redirectTo: 'apostadores'},
    { 
        path: 'apostadores', 
        loadChildren: () => import('./apostadores/apostadores/apostadores.module')
            .then(m => m.ApostadoresModule)}
];
