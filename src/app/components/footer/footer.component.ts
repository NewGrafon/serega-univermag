import { Component } from '@angular/core';
import {Event, NavigationEnd, Router} from "@angular/router";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentRoute: string = '/';

  ngOnInit() {
    this.currentRoute = location.pathname;
  }

  constructor(private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        AppComponent.WaitForUpdateUser((url: string) => {
          this.currentRoute = url;
        });
      }
    });
  }
}
