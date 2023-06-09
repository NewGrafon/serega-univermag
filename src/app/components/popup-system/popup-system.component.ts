import { Component } from '@angular/core';

@Component({
  selector: 'app-popup-system',
  templateUrl: './popup-system.component.html',
  styleUrls: ['./popup-system.component.scss']
})
export class PopupSystemComponent {
  message: string | null = null;
  private readonly messages: string[] = [];

  public static Instance: PopupSystemComponent;

  constructor() {
    PopupSystemComponent.Instance = this;
  }

  public static SendMessage(msg: string): void {
    this.Instance.messages.push(msg);
    this.Instance.updateMessages();
  }

  private updateMessages(): void {
    if (this.messages.length > 0 && this.message === null) {
      this.message = this.messages[0];
    }
  }

  closePopup(): void {
    this.message = null;
    this.messages.splice(0, 1);
    this.updateMessages();
  }
}
