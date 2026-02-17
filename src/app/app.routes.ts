import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { MenuComponent } from './pages/menu/menu';
import { ManageSpecialsComponent } from './components/manage-specials-component/manage-specials-component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  {
    path: 'admin/manage-specials',
    component: ManageSpecialsComponent,
    title: 'Manage Specials' 
  },
  { path: '**', redirectTo: '' }
];