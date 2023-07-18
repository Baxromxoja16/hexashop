import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent implements OnInit, OnDestroy {
  switchTo = false;
  subscription$: Subscription = new Subscription();

  phoneReg = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
  passwordReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])")

  createForm = new FormGroup({
    name: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(this.phoneReg)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordReg)]),
  })

  constructor(private adminAuthService: AdminAuthService){}

  onSubmit(type: string) {
    if (type === 'login') {
      // Login logic
      const data = {
        phone: this.createForm.value.phone,
        password: this.createForm.value.password,
      }

      this.subscription$.add(this.adminAuthService.login(data).subscribe());
    } else if (type === 'register') {
      // Register logic
      const data = {
        name: this.createForm.value.name,
        phone: this.createForm.value.phone,
        password: this.createForm.value.password,
      }

      this.subscription$.add(this.adminAuthService.register(data).subscribe());
    }
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('admin-token'));

  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
