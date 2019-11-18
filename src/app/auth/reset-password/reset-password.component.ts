import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  passMatch = true;
  passReset = false;

  resetPasswordForm = new FormGroup({
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
  });

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onresetPassword() {
    const password = this.resetPasswordForm.value.password;
    const passwordConfirm = this.resetPasswordForm.value.passwordConfirm;
    const token = this.route.snapshot.paramMap.get('token');
    if (password === passwordConfirm) {
      console.log(password);
      console.log(token);
      this.authService.resetPassword(token, password, passwordConfirm).subscribe(res => {
        console.log(res);
        if (res.status === 'success') {
          this.passReset = true;
        }
      });
    } else {
      this.passMatch = false;
      console.log('passwords do not match');
    }
  }

}
