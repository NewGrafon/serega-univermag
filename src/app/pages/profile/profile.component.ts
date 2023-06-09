import { Component } from '@angular/core';
import {userInfo} from "../../global-variables";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  get user() {
    return userInfo
  }
}
