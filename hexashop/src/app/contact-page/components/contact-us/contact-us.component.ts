import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactService, userMessage } from '../../services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnDestroy {
  subscription$: Subscription = new Subscription();

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^[A-Za-z]+$'))]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  })

  constructor(private contactService: ContactService) { }

  onSubmit() {
    this.subscription$.add(this.contactService.sendMessage(this.createForm.value as userMessage).subscribe(console.log));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
