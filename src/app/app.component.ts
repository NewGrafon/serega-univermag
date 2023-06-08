import { Component } from '@angular/core';
import {Event, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'serega-univermag';

  private static cbAfterUpdateUser: any[] = [];
  public static WaitForUpdateUser(cb?: (url: string) => void) {
    AppComponent.cbAfterUpdateUser.push(cb);
  }
  public static navigationEventFinished: boolean = false;
  constructor(private router: Router) {

    router.events.subscribe(async (event: Event) => {

      if (event instanceof NavigationEnd) {

        AppComponent.navigationEventFinished = false;

        for (const cb of AppComponent.cbAfterUpdateUser) {
          cb(event.url);
        }
        AppComponent.cbAfterUpdateUser = [];

        AppComponent.navigationEventFinished = true;
      }

    });

  }
}
