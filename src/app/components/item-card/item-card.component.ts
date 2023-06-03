import {Component, Input} from '@angular/core';
import { IItemInfo } from "../../fake-items-database";
import {ICartItem} from "../../pages/shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  @Input() itemInfo: IItemInfo | null = null;
  @Input() itemInfoForCart: ICartItem | null = null;

  addToCart(): void {

  }

  incrementItemCount(): void {

  }

  decrementItemCount(): void {
    if (this.itemInfoForCart?.count === 1) {
      this.removeItemFromCart();
    } else {
      // @ts-ignore
      this.itemInfoForCart?.count--;
    }
  }

  removeItemFromCart(): void {

  }
}


