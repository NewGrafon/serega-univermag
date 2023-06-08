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
  @Input() minPrice: number | null = null;
  @Input() maxPrice: number | null = null;

  itemsDB: IItemInfo[] = GetFakeDB();

  itemsIDsInCart: string[] = [];

  updateIDsInCart(): boolean {
    this.itemsIDsInCart = [];
    for (let item of this.itemsInCart) {
      this.itemsIDsInCart.push(item.info.id);
    }
    return true;
  }

  correctPriceBounds(min: any, max: any): void {
    if (max.value !== "" && Number(min.value) > Number(max.value))
    {
      min.value = max.value;
    }

    this.minPrice = min.value !== "" ? Number(min.value) : null;
    this.maxPrice = max.value !== "" ? Number(max.value) : null;
  }

  priceInBound(itemPrice: number): boolean {
    const min = this.minPrice ?? Number.MIN_VALUE;
    const max = this.maxPrice ?? Number.MAX_VALUE;

    return min <= itemPrice && itemPrice <= max;
  }
  ngOnInit() {

  }

  protected readonly Categories = Categories;
  protected readonly itemsInCart: ICartItem[] = ShoppingCartComponent.itemsInCart;
}
