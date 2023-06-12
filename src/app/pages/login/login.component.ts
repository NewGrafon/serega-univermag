import { Component } from '@angular/core';
import {PopupSystemComponent} from "../../components/popup-system/popup-system.component";
import {Router} from "@angular/router";
import {HeaderComponent} from "../../components/header/header.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  async TryLogin(): Promise<void> {
    const form = document.forms.namedItem('login-form') || new HTMLFormElement();

    const validResult = this.validation(form);

    if (validResult.message !== null) {
      PopupSystemComponent.SendMessage(validResult.message);
    }

    if (!validResult.result) {
      return;
    }

    const body: any = {
      email: form['email'].value,
      password: form['password'].value
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    console.log(response)
    const result = await response.json();
    console.log(result)
    if (result.result === true) {
      await this.router.navigateByUrl("/");
      return;
    } else {
        PopupSystemComponent.SendMessage('Не получилось войти в аккаунт!');
        return;
    }
  }

  constructor(private router: Router) {}

  private validation(form: HTMLFormElement): ILoginResult {
    if (form['email'].value === "")
      return { result: false, message: 'Поле с email не заполнено!' };

    if (form['password'].value === "")
      return { result: false, message: 'Поле с паролем не заполнено!' };

    return { result: true, message: null };
  }

  protected readonly HeaderComponent = HeaderComponent;
}

interface ILoginResult {
  result: boolean,
  message: string | null
}
