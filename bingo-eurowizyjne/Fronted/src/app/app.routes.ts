import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ModifyComponent } from './modify/modify.component';
import { BingoComponent } from './bingo/bingo.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full'},
    { path: 'Home', component: HomeComponent},
    { path: 'AboutUs', component: AboutUsComponent},
    { path: 'Modify', component: ModifyComponent},
    { path: 'Bingo', component: BingoComponent}
];
