import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from './login/login';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [Login],
  template: `
    <div class="auth-container">
      <app-login (loggedIn)="onLogin($event)"></app-login>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      min-height: 100vh;
    }
  `]
})
export class AuthComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onLogin(user: any) {
    if (!user) {
      return;
    }
    this.authService.login(user);
    
    // Obtener la URL de retorno de los query params, o usar /alumnos por defecto
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/alumnos';
    this.router.navigate([returnUrl]);
  }
}

