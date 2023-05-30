import {Component, OnInit} from '@angular/core';
import {GetFakeDB, IItemInfo} from "../../fake-items-database";


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  itemsInCart: ICartItem[] = [];

  ngOnInit() {
    const fakeDB = GetFakeDB();

    let lsStr = localStorage.getItem('cart');
    let lsJson: ILocalStorageItem[] = JSON.parse(lsStr ?? '[]');

    // @ts-ignore
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
}

export interface ICartItem {
  info: IItemInfo,
  count: number
}

interface ILocalStorageItem {
  id: string,
  count: number
}
