import { Component } from '@angular/core';
import {Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  currentRoute: string;

  menuBlock: any
  closeMenuBlock: any

  openMenu() {
    this.menuBlock = document.getElementById("menu_block")
    this.menuBlock?.classList.remove("menu_block")
    this.menuBlock?.classList.add("menu_block_active")
  }

  closeMenu() {
    this.closeMenuBlock = document.getElementById("close_menu")
    this.menuBlock?.classList.remove("menu_block_active")
    this.menuBlock?.classList.add("menu_block")
  }

  constructor(private router: Router) {
    this.currentRoute = "/";
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {

      }

      if (event instanceof NavigationEnd) {
        AppComponent.WaitForUpdateUser(async () => {
          this.currentRoute = event.url;
        });
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
  }
}
