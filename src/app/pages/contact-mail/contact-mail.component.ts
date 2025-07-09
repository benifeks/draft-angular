import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact-mail',
  templateUrl: './contact-mail.component.html',
  styleUrl: './contact-mail.component.scss',
  imports: [CommonModule, FormsModule],
})
export class ContactMailComponent {
  formData = {
    user_email: '',
    message: '',
  };

  status: string = '';

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.status = 'Отправка...';

    emailjs
      .send(
        'service_pt0oeps',
        'template_aet7agt',
        this.formData,
        'eQ-bleyioVcVMvpt2'
      )
      .then(
        () => {
          this.status = 'Сообщение отправлено успешно!';
          this.formData = { user_email: '', message: '' };
        },
        () => {
          this.status = 'Не удалось отправить сообщение, попробуйте ещё раз.';
        }
      );
  }
}
