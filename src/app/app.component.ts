import {Component, OnInit} from '@angular/core';
import {Event, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {ShoppingCartComponent} from "./pages/shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'serega-univermag';

  private static routeChangeCount: number = 0;
  static get RouteChangeCount(): number {
    return AppComponent.routeChangeCount;
  }

  private static cbAfterUpdateUser: any[] = [];
  public static WaitForUpdateUser(cb?: (url: string) => void) {
    AppComponent.cbAfterUpdateUser.push(cb);
  }
  public static navigationEventFinished: boolean = false;

  constructor(private router: Router) {

    ShoppingCartComponent.RecalculateCart(undefined);

    router.events.subscribe(async (event: Event) => {

      if (event instanceof NavigationEnd) {

        AppComponent.navigationEventFinished = false;

        for (const cb of AppComponent.cbAfterUpdateUser) {
          cb(event.url);
        }
        AppComponent.cbAfterUpdateUser = [];

        AppComponent.navigationEventFinished = true;

        AppComponent.routeChangeCount++;
      }

    });

  }
}

