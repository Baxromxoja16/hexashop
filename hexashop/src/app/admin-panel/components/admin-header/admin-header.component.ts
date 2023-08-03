import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/auth/services/admin-auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  constructor(private adminAuthService: AdminAuthService, private router: Router){}

  logout() {
    this.adminAuthService.logout();
    this.router.navigate(['/auth/admin']);
  }
}
