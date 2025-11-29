import { Component, OnInit, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NavigationService } from '../../../core/services/navigation/navigation.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class Toolbar implements OnInit {
  appName = 'Sistema de Gestión';
  sectionTitle = signal<string>('Sistema de Gestión');
  @Output() logout = new EventEmitter<void>();

  constructor(
    public authService: AuthService,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit() {
    // Actualizar título cuando cambia la ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.sectionTitle.set(this.navigationService.getCurrentTitleSync());
      });

    // Establecer título inicial
    this.sectionTitle.set(this.navigationService.getCurrentTitleSync());
  }

  onLogout() {
    this.logout.emit();
  }
}
