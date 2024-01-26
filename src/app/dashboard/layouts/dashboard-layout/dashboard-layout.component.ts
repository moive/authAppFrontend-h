import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public user = computed(() => this.authService.currentUser());

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
