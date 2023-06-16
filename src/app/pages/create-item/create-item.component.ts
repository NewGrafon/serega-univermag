import { Component } from '@angular/core';
import {Categories} from "../../items-config";
import {PopupSystemComponent} from "../../components/popup-system/popup-system.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {

  categories: ICategory[] = [];

  async tryCreate(): Promise<void> {
    const form = document.forms.namedItem("create-item-form") || new HTMLFormElement();
    const formData = new FormData(form);
    const body: any = {};
    formData.forEach((value, key) => {
      // @ts-ignore
      body[key] = value;
    });

    let reader = new FileReader();
    reader.readAsDataURL(body.image);
    reader.onload = function () {
      body.image = {
        mimetype: (body.image as File).type,
        buffer: reader.result
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    const interval: any = setInterval(async () => {
      if (body.image.mimetype !== undefined) {
        const response = await fetch('/api/create-item', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        });
        const result = await response.json();
        console.log(result)
        if (result.result === true) {
          await this.router.navigateByUrl("/admin-panel");
          return clearInterval(interval);
        } else {
          PopupSystemComponent.SendMessage('Произошла неизвестная ошибка, попробуйте еще раз!');
          return clearInterval(interval);
        }
      }
    }, 100);
  }

  addImage(event: Event, container: HTMLLabelElement): void {
    if (container === null)
      return;

    const element = event.currentTarget as HTMLInputElement;
    const file = element.files?.item(0);

    if (file === null || file === undefined)
      return;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      container.style.backgroundImage = `url("${reader.result}")`;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  constructor(private router: Router) {
    for (let key in Categories) {
      this.categories.push({
        // @ts-ignore
        key: Categories[key],
        value: key
      });
    }
  }

  protected readonly Categories = Categories;
}

interface ICategory {
  key: string,
  value: string
}
