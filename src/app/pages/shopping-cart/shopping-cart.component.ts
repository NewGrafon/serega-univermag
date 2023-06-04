import {Component, OnInit} from '@angular/core';
import {GetFakeDB, IItemInfo} from "../../fake-items-database";


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public static itemsInCart: ICartItem[] = [];
  get staticItemsInCart(): ICartItem[] {
    return ShoppingCartComponent.itemsInCart;
  }

  static RecalculateCart(changeObj: ChangeInCart | undefined): void {

    const fakeDB = GetFakeDB();

    let lsStr = localStorage.getItem('cart') || '[]';
    let lsJson: ILocalStorageItem[] = JSON.parse(lsStr);

    if (changeObj !== undefined) {

      if (changeObj.type === ChangeInCartType.Add && changeObj.value !== undefined
        && lsJson.filter(item => item.id === changeObj.id).length === 0) {

        lsJson.push({
          id: changeObj.id,
          count: changeObj.value
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
      fakeDB.forEach(fdbItem => {
        if (item.id === fdbItem.id) {
          this.itemsInCart.push({
            info: fdbItem,
            count: item.count
          });
          return;
        }
      });

    }

  }

  ngOnInit() {
    ShoppingCartComponent.RecalculateCart(undefined);
  }
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
