import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {IItemInfo} from "../../items-config";

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {

  id: string | null = null;
  item: IItemInfo | null = null;

  private routeSubscription: Subscription;
  constructor(private router: ActivatedRoute) {
    this.routeSubscription = router.params.subscribe(params => this.id = params['id']);

  }

  async ngOnInit(): Promise<void> {
    const interval = setInterval(async () => {
      if (this.id) {
        const response = await fetch('/api/get-item/' + this.id);
        this.item = await response.json();
        clearInterval(interval);
      }
    }, 25);
  }

}
