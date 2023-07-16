import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {
  subscription$: Subscription = new Subscription();

  switchTo = false;

  phoneReg = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
  passwordReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])")

  createForm = new FormGroup({
    name: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(this.phoneReg)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordReg)]),
  })

  constructor(private authService: AuthService) { }

  onSubmit(type: string) {
    if (type === 'login') {
      // Login logic
      const data = {
        phone: this.createForm.value.phone,
        password: this.createForm.value.password,
      }

      this.subscription$.add(this.authService.login(data).subscribe());
    } else if (type === 'register') {
      // Register logic
      const data = {
        name: this.createForm.value.name,
        phone: this.createForm.value.phone,
        password: this.createForm.value.password,
      }

      this.subscription$.add(this.authService.register(data).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
