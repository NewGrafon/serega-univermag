import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { ShoppingCartComponent } from "./pages/shopping-cart/shopping-cart.component";
import { RegistrationComponent } from "./pages/registration/registration.component";
import { LoginComponent } from "./pages/login/login.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { CatalogComponent } from "./pages/catalog/catalog.component";
import { AdminPanelComponent } from "./pages/admin-panel/admin-panel.component";
import { CreateItemComponent } from "./pages/create-item/create-item.component";
import { ItemPageComponent } from "./pages/item-page/item-page.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'create-item', component: CreateItemComponent },
  { path: 'item-page/:id', component: ItemPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
