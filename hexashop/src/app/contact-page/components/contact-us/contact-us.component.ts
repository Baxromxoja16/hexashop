import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService, userMessage } from '../../services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^[A-Za-z]+$'))]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  })

  constructor(private contactService: ContactService){}

  onSubmit() {
    this.contactService.sendMessage(this.createForm.value as userMessage).subscribe(console.log);
  }
}
