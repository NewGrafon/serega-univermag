import {Component, Input} from '@angular/core';
import {IItemInfo} from "../../fake-items-database";
import {ChangeInCartType, ICartItem, ShoppingCartComponent} from "../../pages/shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  @Input() itemInfo: IItemInfo | null = null;
  @Input() itemInfoForCart: ICartItem | null = null;

  addToCart(): void {
    if (this.itemInfo?.id) {
      ShoppingCartComponent.RecalculateCart({
        type: ChangeInCartType.Add,
        id: this.itemInfo?.id,
        value: undefined
      })
    }
  }

  incrementItemCount(): void {
    const id = this.itemInfo?.id || this.itemInfoForCart?.info.id;
    if (id !== undefined) {
      ShoppingCartComponent.RecalculateCart({
        type: ChangeInCartType.Increment,
        id: id,
        value: 1
      })
    }
  }

  decrementItemCount(): void {
    const id = this.itemInfo?.id || this.itemInfoForCart?.info.id;
    if (id !== undefined) {
      ShoppingCartComponent.RecalculateCart({
        type: ChangeInCartType.Decrement,
        id: id,
        value: 1
      })
    }
  }

  removeItemFromCart(): void {
    if (this.itemInfoForCart?.info.id) {
      ShoppingCartComponent.RecalculateCart({
        type: ChangeInCartType.Remove,
        id: this.itemInfoForCart?.info.id,
        value: undefined
      })
    }
  }


}


