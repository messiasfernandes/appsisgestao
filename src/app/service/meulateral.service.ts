import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MenulateralService {


  exibindoMenu: boolean = false;

  constructor( ) { }

  toggleMenu(): boolean {
    return this.exibindoMenu = !this.exibindoMenu;
  }
}
