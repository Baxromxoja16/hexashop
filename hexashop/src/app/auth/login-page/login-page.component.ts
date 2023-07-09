import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  phoneReg = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
  passwordReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])")

  createForm = new FormGroup({
    phone: new FormControl(null, [Validators.required, Validators.pattern(this.phoneReg)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordReg)]),
    check: new FormControl(false, [Validators.requiredTrue]),
  })

  constructor(private authService: AuthService){}

  onSubmit(type: string) {
    if(type === 'login') {
      // Login logic
      this.authService.login(this.createForm.value).subscribe();
    } else if(type === 'register') {
      // Register logic
    }
  }
}
