import {Component, OnInit} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {AppComponent} from "../../app.component";
import {isLogged, IUserSchema, userInfo} from "../../global-variables";
import {Categories, GetKeyAndReplaceUnderlinesToSpaces, IItemInfo} from "../../items-config";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentRoute: string = '/';
  isLogged: boolean = false;

  get user(): IUserSchema {
    return userInfo;
  }

  menuBlock: any
  closeMenuBlock: any

  static Instance: HeaderComponent;

  searchList: IItemInfo[] = [];

  searchInput(event: any): void {
    const str: string = event.target.value;
    this.searchList = AppComponent.allItemsFromDBWithoutImages
      .filter(item => {
        return str !== '' && item.name.search(str) !== -1;
      });
  }

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

  async logout() {
    fetch('/api/logout?_method=DELETE', {
      method: 'POST'
    })
      .then(async response => {
        const result = await response.json();
        if (result.result === true) {
          this.router.navigateByUrl('/')
            .then(() => {
              // под анимку убирания менюшки
              setTimeout(() => window.location.reload(), 200);
            });
        }
      });
  }

  ngOnInit() {
    this.currentRoute = location.pathname;
  }

  constructor(private router: Router) {
    HeaderComponent.Instance = this;
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        AppComponent.WaitForUpdateUser((url: string) => {
          this.isLogged = isLogged;
          this.currentRoute = url;
          this.searchList = [];
        });
      }
    });
  }

  protected readonly GetKeyAndReplaceUnderlinesToSpaces = GetKeyAndReplaceUnderlinesToSpaces;
}
