import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { MenulateralService } from 'src/app/services/meulateral.service';
@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  exibindoMenu = false;
  constructor(private router: Router, private serviceMenuLateral: MenulateralService) {}
  menu: MenuItem[] = [];
  toggleMenu() {
     this.serviceMenuLateral.toggleMenu();

  }
  closeSidebar() {
    this.exibindoMenu = !this.exibindoMenu;
;
  }


  ngOnInit(): void {
    this.menu = [
      {
        label: 'Cadastro',
        icon: PrimeIcons.FILE,

        items: [
          {
            label: 'Clientes',
            icon: PrimeIcons.USER_PLUS,

          },

          {
            label: 'Fornecedores',
            icon: PrimeIcons.USER_MINUS,

            routerLink: ['/produtos'],
            routerLinkActiveOptions: { exact: true },

          },

          {
            label: 'Funicionários',
            icon: PrimeIcons.USER,
            routerLinkActiveOptions: { exact: true },
          },

          {
            label: 'Produtos',
            icon: ' fa-solid fa-boxes-packing fa-xl"',
            routerLink: ['/produtos'],
           command: () => this.closeSidebar(),

          },

        ],
        separator:true,
      },

      {
        label: 'Estoque',
        icon: 'fa-solid fa-truck-ramp-box',
        items: [
          {
            label: 'Estoque Movimento',
            icon: 'fa-solid fa-warehouse fa-xl',
            routerLink: ['/movimentacoes'],
            command: () => this.closeSidebar(),
          },
          {
            label: 'Importar Nota fiscal',
            icon: 'fa-solid fa-file-invoice fa-xl',
            expanded: true,
            routerLink: ['/importarnotalfiscal'],
           // command: () => this.closeSidebar(),
          },
          {
            label: 'Kits/Combos',
            icon: PrimeIcons.TICKET,
          },
        ],
      },
      {
        label: 'Financeiro',
        icon: PrimeIcons.DOLLAR,
        items: [
          {
            label: 'Condições de Pagamento',
            icon: 'pi pi-tablet',
            //      routerLink: ['/contaspagar'],
          },
          {
            label: 'Contas Receber',
            icon: PrimeIcons.MONEY_BILL,
            // routerLink: ['/contasreceber'],
          },
          {
            label: 'Contas Pagar',
            icon: 'pi pi-calculator',
            //      routerLink: ['/contaspagar'],
          },
          {
            label: 'Caixa',
            icon: 'fa-solid fa-cash-register fa-xl',
                routerLink: ['/comandas'],
          },
        ],
      },
      {
        label: 'Vendas',
        icon: ' fa-solid fa-cart-shopping ',
        items: [
          {
            label: 'Vendas',
            icon: 'fa-solid fa-cart-plus fa-xl',
            routerLink: ['/vendas'],
          },
          {
            label: 'Compras',
            icon: 'pi pi-shopping-bag',
            routerLink: ['/compras'],
          },
        ],
      },
    ];
  }
}
