import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToastrService } from 'ngx-toastr';
import { log } from 'console';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LoginComponent {

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginForm: FormGroup;
  isSignup: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {

    this.loginForm = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['traveller', Validators.required]

    })
    this.updateUsernameValidation();
  }

  toggleForm() {
    this.isSignup = !this.isSignup;
    this.updateUsernameValidation();
  }


  updateUsernameValidation() {
    const usernameControl = this.loginForm.get('username');
    if (this.isSignup) {
      usernameControl?.setValidators(Validators.required);
    } else {
      usernameControl?.clearValidators();
    }
    usernameControl?.updateValueAndValidity();
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Form Submitted:", this.loginForm.value);
      if (this.isSignup) {
        this.register();
      } else {
        this.login();
      }
    } else {
      this.loginForm.markAllAsTouched();
      this.toastr.warning("Please fill all required fields correctly!");
    }
  }


  login() {
    console.log("inside login");

    const { email, password, userType } = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.warning('Please fill all required fields correctly');
      return;

    }

    this.authService.login(email, password, userType).subscribe(

      (response: { token: string, role: string }) => {

        this.authService.setToken(response.token);
        this.authService.setUserType(response.role);

        if (response.role === 'admin') {
          console.log("navigating to admin");

          this.router.navigate(['/Admin']);
        }
        else {
          this.router.navigate(['/Landing']);
        }
        console.log(response.token);
        console.log(response.role);

      },
      (error: any) => {
        console.error("Login error:", error);
        this.toastr.error('Invalid email or password', 'Authentication failed');
      }

    );

  }
  register() {
    console.log("inside reg");


    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.warning("Please fill all required fields correctly!");
      return;
    }

    const { username, email, password, userType } = this.loginForm.value;
    console.log(this.loginForm.value);
    this.authService.register(username, email, password).subscribe(
      (response: { message: string }) => {
        console.log(response);
        this.toastr.success(response.message || "register successfull");
        this.loginForm.reset();

      },
      (error: any) => {
        if (error.status === 400) {


          this.toastr.error(error.error.message);
        }

      }

    );

  }




}



