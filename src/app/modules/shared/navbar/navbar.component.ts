import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MenuService } from '../../service/menu.service';
import { Menu } from '../../interfaces/menu';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];
  mostrarSoloItemIndex: number = 0;
  showFiller = false;
  @ViewChild('drawer') drawer: MatDrawer | undefined; // Obtiene la referencia al mat-drawer
  isDrawerOpen = false; // Variable que almacena el estado del drawer (abierto o cerrado)

  constructor(private _menuService: MenuService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu() {
    this._menuService.getMenu().subscribe(data => {
      this.menu = data;
    });
  }

  get filteredMessagesMenu() {
    return this.menu.filter(item =>
      item.nombre === 'Bandeja de entrada' ||
      item.nombre === 'Bandeja de salida' ||
      item.nombre === 'Borradores'
    ).map(item => {
      return {
        ...item,
        redirect:
          item.nombre === 'Bandeja de entrada' ? '/dashboard/bandeja-entrada' :
          item.nombre === 'Bandeja de salida' ? '/dashboard/bandeja-salida' :
          '/dashboard/borradores'
      };
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/inicio-sesion']);
  }

  // Método para cambiar el estado del botón cuando el drawer se abre o se cierra
  toggleDrawer() {
    if (this.drawer) {
      this.isDrawerOpen = this.drawer.opened;
    }
  }
}
