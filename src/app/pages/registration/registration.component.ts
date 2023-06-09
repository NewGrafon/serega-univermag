import { Component } from '@angular/core';
import {PopupSystemComponent} from "../../components/popup-system/popup-system.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  async TryRegistration(): Promise<void> {
    const form = document.forms.namedItem('registration-form') || new HTMLFormElement();

    const validResult = this.validation(form);

    if (validResult.message !== null) {
      PopupSystemComponent.SendMessage(validResult.message);
    }

    if (!validResult.result) {
      return;
    }

    const body: any = {
      firstname: form['firstname'].value,
      lastname: form['lastname'].value,
      email: form['email'].value,
      password: form['password'].value
    }
    if (form['phone'].value) {
      body.phone = form['phone'].value;
    }

    const response = await fetch('/api/registration', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    if (result.result === true) {
      await this.router.navigateByUrl("/login");
      return;
    } else {
      if (result.error) {
        PopupSystemComponent.SendMessage(result.error);
      }
      return;
    }
  }

  constructor(private router: Router) {}

  private validation(form: HTMLFormElement): IRegisterResult {
    if (!(form['firstname'].value && form['lastname'].value))
      return { result: false, message: 'Поле с именем и/или фамилией не заполнено!' };

    if (form['email'].value === "")
      return { result: false, message: 'Поле с email не заполнено!' };

    if (form['password'].value === "")
      return { result: false, message: 'Поле с паролем не заполнено!' };

    if (form['password'].value !== form['repeat-password'].value)
      return { result: false, message: 'Поле "Пароль" и "Повторите пароль" не совпадают!' };

    return { result: true, message: null };
  }
}

interface IRegisterResult {
  result: boolean,
  message: string | null
}
