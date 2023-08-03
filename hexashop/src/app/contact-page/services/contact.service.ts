import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface userMessage {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = 'https://hexashop-so83.onrender.com/'

  constructor(private http: HttpClient) { }

  sendMessage(data: userMessage) {
    return this.http.post(this.baseUrl + 'users/contact', data);
  }
}
