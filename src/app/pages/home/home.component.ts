import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Categories, IItemInfo} from "../../items-config";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  itemsDB: IItemInfo[] = [];

  static AllForHomeCategories: Categories[] = [Categories.Товары_для_дома];

  constructor() {

  }

  protected readonly itemsInCart = ShoppingCartComponent.itemsInCart;
  protected readonly Number = Number;

  async ngOnInit(): Promise<void> {
    this.itemsDB = await AppComponent.getRealItemsFromDB();
  }
}

@Pipe({
  name: 'FilterByHomeCategories'
})
export class FilterByHomeCategories implements PipeTransform {
  transform(items: IItemInfo[]): any {
    return items.filter(item => HomeComponent.AllForHomeCategories.includes(item.category));
  }
}
