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
  public static WaitForUpdateUser(cb?: (user: any) => Promise<void>) {
    AppComponent.cbAfterUpdateUser.push(cb);
  }
  public static navigationEventFinished: boolean = false;
  constructor(private router: Router) {

    this.router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {

      }

      if (event instanceof NavigationEnd) {

        AppComponent.navigationEventFinished = false;

        for (const cb of AppComponent.cbAfterUpdateUser) {
          await cb();
        }
        AppComponent.cbAfterUpdateUser = [];

        // let notAllowed: boolean = false;
        // if (!isLogged && this.AuthUrls().includes(event.url)) {
        //   notAllowed = true;
        // }
        //
        // if (userInfo.accountType < 1 && this.ModeratorAuthUrls.includes(event.url)) {
        //   notAllowed = true;
        // }
        //
        // if (userInfo.accountType < 2 && this.AdminAuthUrls.includes(event.url)) {
        //   notAllowed = true;
        // }
        //
        // if (notAllowed) {
        //   await this.router.navigateByUrl('/');
        // }

        AppComponent.navigationEventFinished = true;
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });

  }
}

