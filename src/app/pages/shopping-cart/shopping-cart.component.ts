import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {GetFakeDB, IItemInfo} from "../../fake-items-database";
import {HomeComponent} from "../home/home.component";
import {Observable} from "rxjs";
import {AppComponent} from "../../app.component";


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public static itemsInCart: ICartItem[] = [];
  itemsInCart: ICartItem[] = [];
  static currentInstance: ShoppingCartComponent;

  private static changeCartSubscribers: IChangeCartSubscriber[] = [];
  public static subscribeToChangeCart(sub: IChangeCartSubscriber) {
    ShoppingCartComponent.changeCartSubscribers.push(sub);
  }
  private static changeCartEvent(): void {

    ShoppingCartComponent.changeCartSubscribers
      = ShoppingCartComponent.changeCartSubscribers
        .filter(item => item.createdOnRouteCount === AppComponent.RouteChangeCount);

    console.log(AppComponent.RouteChangeCount, ShoppingCartComponent.changeCartSubscribers)

    ShoppingCartComponent.changeCartSubscribers
      .forEach(sub => {
        sub.cb();
      });
  }

  constructor() {
    ShoppingCartComponent.currentInstance = this;
  }

  ngOnInit() {
    ShoppingCartComponent.RecalculateCart(undefined);
    this.itemsInCart = ShoppingCartComponent.itemsInCart;
  }

  static RecalculateCart(changeObj: ChangeInCart | undefined): void {

    const itemsDB = GetFakeDB();

    let lsStr = localStorage.getItem('cart') || '[]';
    let lsJson: ILocalStorageItem[] = JSON.parse(lsStr);

    if (changeObj !== undefined) {

      if (changeObj.type === ChangeInCartType.Add
        && lsJson.filter(item => item.id === changeObj.id).length === 0) {

        lsJson.push({
          id: changeObj.id,
          count: 1
        });

      } else {

        let breakLoop: boolean = false;
        for (let i = 0; i < lsJson.length; i++) {
          if (breakLoop) {
            break;
          }

          const cartItem = lsJson[i];

          switch (changeObj.type) {
            case ChangeInCartType.Remove:
              if (cartItem.id === changeObj.id) {
                lsJson.splice(i, 1);
                breakLoop = true;
              }
              break;

            case ChangeInCartType.Increment:
              if (cartItem.id === changeObj.id) {
                breakLoop = true;
                lsJson[i].count++;
              }
              break;

            case ChangeInCartType.Decrement:
              if (cartItem.id === changeObj.id) {
                breakLoop = true;
                if (lsJson[i].count === 1) {
                  lsJson.splice(i, 1);
                } else {
                  lsJson[i].count--;
                }
              }
              break;
          }
        }

      }

      localStorage.setItem('cart', JSON.stringify(lsJson));
    }

    ShoppingCartComponent.itemsInCart = [];

    for (let item of lsJson) {
      itemsDB.forEach(fdbItem => {
        if (item.id === fdbItem.id) {
          const obj: ICartItem = {
            info: fdbItem,
            count: item.count
          }
          ShoppingCartComponent.itemsInCart.push(obj);
          return;
        }
      });
    }

    if (ShoppingCartComponent.currentInstance) {
      ShoppingCartComponent.currentInstance.itemsInCart = ShoppingCartComponent.itemsInCart;
    }

    ShoppingCartComponent.changeCartEvent();
  }

  getCartPrice(): number {
    let result = 0;
    this.itemsInCart.forEach(item => {
      result += item.info.price * item.count;
    })
    return result;
  }
}

@Pipe({
  name: 'ThisItemInCart'
})
export class ThisItemInCart implements PipeTransform {
  transform(item: IItemInfo): IThisItemInCartResponse {
    const result = ShoppingCartComponent.itemsInCart.filter(cItem => cItem.info.id === item.id);
    if (result.length > 0) {
      return {
        result: true,
        count: result[0].count
      }
    } else {
      return {
        result: false,
        count: null
      }
    }
  }
}

export interface IThisItemInCartResponse {
  result: boolean,
  count: number | null
}

export interface IChangeCartSubscriber {
  who: any,
  cb: Function,
  createdOnRouteCount: number
}

export enum ChangeInCartType {
  Add,
  Remove,
  Increment,
  Decrement
}

export interface ChangeInCart {
  type: ChangeInCartType,
  id: string,
  value: number | undefined
}

export interface ICartItem {
  info: IItemInfo,
  count: number
}

export interface ILocalStorageItem {
  id: string,
  count: number
}
