import {Component, Pipe, PipeTransform} from '@angular/core';
import {Categories, GetFakeDB, IItemInfo} from "../../fake-items-database";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  itemsDB: IItemInfo[];

  static AllForHomeCategories: Categories[] = [Categories.Остальное];

  constructor() {
    this.itemsDB = GetFakeDB();
  }

  protected readonly itemsInCart = ShoppingCartComponent.itemsInCart;
  protected readonly Number = Number;
}

@Pipe({
  name: 'FilterByHomeCategories'
})
export class FilterByHomeCategories implements PipeTransform {
  transform(items: IItemInfo[]): any {
    return items.filter(item => HomeComponent.AllForHomeCategories.includes(item.category));
  }
}
