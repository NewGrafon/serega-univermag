import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  menuBlock: any
  closemenu: any

  openmenu() {
    this.menuBlock = document.getElementById("menu_block")
    this.menuBlock?.classList.remove("menu_block")
    this.menuBlock?.classList.add("menu_block_active")

  }



  closeMenu() {
    this.closemenu = document.getElementById("closemenu")
    this.menuBlock?.classList.remove("menu_block_active")
    this.menuBlock?.classList.add("menu_block")

  }


}
