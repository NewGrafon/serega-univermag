import {Component, OnInit} from '@angular/core';
import {IItemInfo} from "../../items-config";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  itemsDB: IItemInfo[] = [];

  constructor() {

  }

  async ngOnInit(): Promise<void> {
    this.itemsDB = await AppComponent.getRealItemsFromDB();
  }
}
