import {Component, Pipe, PipeTransform} from '@angular/core';
import {Categories, GetFakeDB, IItemInfo} from "../../fake-items-database";

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

}

@Pipe({
  name: 'FilterByHomeCategories'
})
export class FilterByHomeCategories implements PipeTransform {
  transform(items: IItemInfo[]): any {
    return items.filter(item => HomeComponent.AllForHomeCategories.includes(item.category));
  }
}
