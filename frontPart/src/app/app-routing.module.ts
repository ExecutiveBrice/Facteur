import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionComponent} from "./pages";

const appRoutes: Routes = [
// { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: GestionComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,  { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }