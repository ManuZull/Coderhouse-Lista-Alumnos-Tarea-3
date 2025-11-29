import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface RouteTitle {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private routeTitles: RouteTitle = {
    '/alumnos': 'Gestión de Alumnos',
    '/cursos': 'Gestión de Cursos',
    '/inscripciones': 'Inscripciones',
    '/admin': 'Administración de Usuarios',
    '/auth': 'Iniciar Sesión'
  };

  constructor(private router: Router) {}

  getCurrentTitle(): Observable<string> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const url = this.router.url.split('?')[0];
        return this.routeTitles[url] || 'Sistema de Gestión';
      })
    );
  }

  getTitleForRoute(route: string): string {
    return this.routeTitles[route] || 'Sistema de Gestión';
  }

  getCurrentTitleSync(): string {
    const url = this.router.url.split('?')[0];
    return this.routeTitles[url] || 'Sistema de Gestión';
  }
}

