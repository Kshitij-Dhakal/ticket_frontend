import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest } from '../auth-request';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  requestModel = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl('')
  })
  error?: string;
  msg?: string;
  submittingForm?: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.submittingForm) {
      const authRequest: AuthRequest = {
        email: this.requestModel.value.email ?? '',
        password: this.requestModel?.value?.password ?? ''
      }
      if (this.requestModel.valid) {
        this.submittingForm = true;
        this.authService.login(authRequest)
        .subscribe({
          next: (v) => {
            this.router.navigate(['/'])
          },
          error: (e) => this.error = e,
        });
      }
    }
    this.submittingForm = false;
  }

  clearMsg() {
    this.msg = undefined;
    this.error = undefined;
  }

}
