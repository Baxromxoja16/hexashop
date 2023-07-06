import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  createForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern(new RegExp('^[A-Za-z]+$'))]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    message: new FormControl(null, [Validators.required]),
  })

  onSubmit() {
    console.log(this.createForm.value);
  }
}
