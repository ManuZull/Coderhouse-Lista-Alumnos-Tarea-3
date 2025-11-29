import { Component } from '@angular/core';
import { AdminUsers } from './admin-users';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminUsers],
  template: `
    <div class="admin-container">
      <app-admin-users></app-admin-users>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 1rem;
    }
  `]
})
export class AdminComponent {
}

