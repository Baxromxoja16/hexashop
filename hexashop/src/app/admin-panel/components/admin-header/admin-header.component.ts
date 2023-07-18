import { Component } from '@angular/core';
import { AdminAuthService } from 'src/app/auth/services/admin-auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  constructor(private adminAuthService: AdminAuthService){}

  logout() {
    this.adminAuthService.logout();
  }
}
