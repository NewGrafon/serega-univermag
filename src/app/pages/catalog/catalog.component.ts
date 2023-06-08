import {Component, Input, OnInit} from '@angular/core';
import {Categories, GetFakeDB, IItemInfo} from "../../fake-items-database";
import {ICartItem, ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  @Input('ngModel') selectedCategory: Categories = Categories.Всё;
  // @Input('ngModel') minPrice: number | null = null;
  // @Input('ngModel') maxPrice: number | null = null;

  itemsDB: IItemInfo[] = GetFakeDB();

  itemsIDsInCart: string[] = [];

  updateIDsInCart(): boolean {
    this.itemsIDsInCart = [];
    for (let item of this.itemsInCart) {
      this.itemsIDsInCart.push(item.info.id);
    }
    return true;
  }

  // priceInBound(): boolean {
  //
  // }
  ngOnInit() {

  }

  protected readonly Categories = Categories;
  protected readonly itemsInCart: ICartItem[] = ShoppingCartComponent.itemsInCart;
}
