import {Component, Input, OnInit} from '@angular/core';
import {IItemInfo} from "../../items-config";
import {ChangeInCartType, ShoppingCartComponent} from "../../pages/shopping-cart/shopping-cart.component";
import {AppComponent} from "../../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() itemInfo: IItemInfo | null = null;
  @Input() existInCart: boolean = false;
  countInCart: number = 0;
  @Input() isItemPage: boolean = false;

  async ngOnInit() {
    this.updateItemInfo();
    ShoppingCartComponent.subscribeToChangeCart({
      who: this,
      cb: async () => {
        this.updateItemInfo();
      },
      createdOnRouteCount: AppComponent.RouteChangeCount
    });
  }

  updateItemInfo(): void {
    this.existInCart = false;
    this.countInCart = 0;

    ShoppingCartComponent.itemsInCart.forEach(item => {
      if (this.itemInfo?.id === item.info.id) {
        this.existInCart = true;
        this.countInCart = item.count;
      }
    })
  }

  async addToCart(): Promise<void> {
    console.log(this.itemInfo)
    const id = this.itemInfo?.id;
    if (!this.existInCart && id) {
      await ShoppingCartComponent.RecalculateCart({
        type: ChangeInCartType.Add,
        id: id,
        value: undefined
      })

      this.updateItemInfo();
    }
  }

  async incrementItemCount(): Promise<void> {
    const id = this.itemInfo?.id;
    if (id !== undefined) {
      await ShoppingCartComponent.RecalculateCart({
        type: ChangeInCartType.Increment,
        id: id,
        value: 1
      })

      this.updateItemInfo();
    }
  }

  async decrementItemCount(): Promise<void> {
    const id = this.itemInfo?.id;
    if (id) {
      await ShoppingCartComponent.RecalculateCart({
        type: ChangeInCartType.Decrement,
        id: id,
        value: 1
      })

      this.updateItemInfo();
    }
  }

  async removeItemFromCart(): Promise<void> {
    const id = this.itemInfo?.id;
    if (this.existInCart && id) {
      await ShoppingCartComponent.RecalculateCart({
        type: ChangeInCartType.Remove,
        id: id,
        value: undefined
      })

      this.updateItemInfo();
    }
  }

  private routeSubscription: Subscription = new Subscription();
  constructor(private actRouter: ActivatedRoute, private router: Router) {
    if (router.url.includes('/item-page/')) {
      this.routeSubscription = actRouter.params.subscribe(async params => {
        const id = params['id'];
        const response = await fetch('/api/get-item/' + id);
        const result = await response.json();
        result.id = result._id;
        this.itemInfo = result;
        this.updateItemInfo();
      });
    }
  }

}


