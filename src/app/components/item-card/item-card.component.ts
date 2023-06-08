import {Component, Input, OnInit} from '@angular/core';
import {IItemInfo} from "../../fake-items-database";
import {ChangeInCartType, ShoppingCartComponent} from "../../pages/shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() itemInfo: IItemInfo | null = null;
  @Input() existInCart: boolean = false;
  countInCart: number = 0;
  @Input() isShoppingCart: boolean = false;

  ngOnInit() {
    this.updateItemInfo();
  }

  updateItemInfo(): void {
    this.existInCart = false;
    this.countInCart = 0;

    ShoppingCartComponent.itemsInCart.forEach(item => {
      console.log(item)
      if (this.itemInfo?.id === item.info.id) {
        this.existInCart = true;
        this.countInCart = item.count;
      }
    })
  }

  addToCart(): void {
    const id = this.itemInfo?.id;
    if (!this.existInCart && id) {
      ShoppingCartComponent.RecalculateCart({
        type: ChangeInCartType.Add,
        id: id,
        value: undefined
      })

      this.updateItemInfo();
    }
  }

  incrementItemCount(): void {
    const id = this.itemInfo?.id;
    if (id !== undefined) {
      ShoppingCartComponent.RecalculateCart({
        type: ChangeInCartType.Increment,
        id: id,
        value: 1
      })

      this.updateItemInfo();
    }
  }

  decrementItemCount(): void {
    const id = this.itemInfo?.id;
    if (id) {
      ShoppingCartComponent.RecalculateCart({
        type: ChangeInCartType.Decrement,
        id: id,
        value: 1
      })

      this.updateItemInfo();
    }
  }

  removeItemFromCart(): void {
    const id = this.itemInfo?.id;
    if (this.existInCart && id) {
      ShoppingCartComponent.RecalculateCart({
        type: ChangeInCartType.Remove,
        id: id,
        value: undefined
      })

      this.updateItemInfo();
    }
  }
}


