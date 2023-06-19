import {Component, OnInit} from '@angular/core';
import {IItemInfo} from "../../items-config";
import {AppComponent} from "../../app.component";
import {PopupSystemComponent} from "../../components/popup-system/popup-system.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  itemsDB: IItemInfo[] = [];

  async tryRemove(id: string): Promise<void> {
    const response = await fetch('/api/remove-item/'+id);
    const result = await response.json();

    if (result.result) {
      PopupSystemComponent.SendMessage('Товар успешно удален!');
    } else {
      PopupSystemComponent.SendMessage('Произошла ошибка при удалении товара!');
    }

    await this.router.navigateByUrl('/admin-panel');
  }

  constructor(private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.itemsDB = await AppComponent.getRealItemsFromDB();
  }
}
