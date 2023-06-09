import {Component, OnInit} from '@angular/core';
import {Event, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {ShoppingCartComponent} from "./pages/shopping-cart/shopping-cart.component";
import {isLogged, UpdateUser, userInfo} from "./global-variables";
import {PopupSystemComponent} from "./components/popup-system/popup-system.component";

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

  AuthUrls = (): string[] => ['/profile'].concat(this.AdminAuthUrls);
  AdminAuthUrls: string[] = ['/admin-panel'];

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

        const response = await fetch('/api/get_account_info');
        const user = await response.json();
        if (response.ok && user.error !== undefined) {
          UpdateUser({
            firstname: null,
            lastname: null,
            email: null,
            phone: null,
            accountType: 0,
            created: null,
          }, false);
        } else {
          UpdateUser(user, true);
        }

        for (const cb of AppComponent.cbAfterUpdateUser) {
          cb(event.url);
        }
        AppComponent.cbAfterUpdateUser = [];

        let notAllowed: boolean = false;
        if (isLogged && ['/login', '/registration'].includes(event.url)) {
          PopupSystemComponent.SendMessage('Пользователь уже авторизован.');
          notAllowed = true;
        }

        if (!isLogged && this.AuthUrls().includes(event.url)) {
          PopupSystemComponent.SendMessage('Пользователь не авторизован.');
          notAllowed = true;
        }

        if (userInfo.accountType < 1 && this.AdminAuthUrls.includes(event.url)) {
          PopupSystemComponent.SendMessage('Недостаточно прав доступа.');
          notAllowed = true;
        }

        if (notAllowed) {
          await this.router.navigateByUrl('/');
        }

        AppComponent.routeChangeCount++;

        AppComponent.navigationEventFinished = true;
      }

    });

  }
}

