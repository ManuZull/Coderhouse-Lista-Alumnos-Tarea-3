import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Toolbar } from './shared/components/toolbar/toolbar';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { Footer } from './shared/components/footer/footer';
import { AuthService } from './core/services/auth/auth.service';
import { CoursesService } from './core/services/courses/courses';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Toolbar, SidenavComponent, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.coursesService.getCourses();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
