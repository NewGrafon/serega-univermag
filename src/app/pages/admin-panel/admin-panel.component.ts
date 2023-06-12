import { Component } from '@angular/core';
import {GetFakeDB, IItemInfo} from "../../fake-items-database";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  itemsDB: IItemInfo[] = [];

  constructor() {
    this.itemsDB = GetFakeDB();
  }
}
