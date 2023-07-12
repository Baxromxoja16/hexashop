import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {
  isLogin = this.authService.isLogin;

  phone = JSON.parse(localStorage.getItem('phone')!);

  constructor(private authService: AuthService,private router: Router) {}

  logIn() {
    if (!this.isLogin.value) {
      this.router.navigate(['/login'])
    }

    this.authService.logout();
  }
}
