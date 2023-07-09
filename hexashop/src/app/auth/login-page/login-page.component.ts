import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  })

  onSubmit() {
    console.log(this.createForm.status);
  }
}
