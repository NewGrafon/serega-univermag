import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterByHomeCategories, HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShoppingCartComponent, ThisItemInCart } from './pages/shopping-cart/shopping-cart.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import { PopupSystemComponent } from './components/popup-system/popup-system.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ShoppingCartComponent,
    ThisItemInCart,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    ItemCardComponent,
    CatalogComponent,
    FilterByHomeCategories,
    PopupSystemComponent,
    AdminPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
