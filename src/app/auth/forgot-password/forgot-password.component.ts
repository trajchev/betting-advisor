import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  resetTokenSent = false;

  // create the form using reactive forms
  forgotPasswordForm = new FormGroup({
    email: new FormControl(''),
  });

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onForgotPassword() {
    const email = this.forgotPasswordForm.value.email;
    this.authService.forgotPassword(email).subscribe(res => {
      if (res.status && res.status === 'success') {
        this.resetTokenSent = true;
      }
    });
  }

}
