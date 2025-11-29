import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
  badge?: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Output() menuItemClick = new EventEmitter<string>();

  menuItems: MenuItem[] = [
    {
      label: 'Alumnos',
      icon: 'people',
      route: '/alumnos',
      roles: ['ADMIN', 'USER']
    },
    {
      label: 'Cursos',
      icon: 'school',
      route: '/cursos',
      roles: ['ADMIN', 'USER']
    },
    {
      label: 'Inscripciones',
      icon: 'assignment',
      route: '/inscripciones',
      roles: ['ADMIN', 'USER']
    },
    {
      label: 'Usuarios',
      icon: 'admin_panel_settings',
      route: '/admin',
      roles: ['ADMIN'],
      badge: 'Admin'
    }
  ];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  isMenuItemVisible(item: MenuItem): boolean {
    if (!item.roles) return true;
    const userRole = this.authService.getCurrentRole();
    return userRole ? item.roles.includes(userRole) : false;
  }

  onMenuItemClick(item: MenuItem) {
    this.router.navigate([item.route]);
    this.menuItemClick.emit(item.route);
  }

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}

