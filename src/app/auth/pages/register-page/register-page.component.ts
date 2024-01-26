import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  signup() {
    const { name, email, password } = this.myForm.value;
    this.authService.signup(name, email, password).subscribe({
      next: () => {
        Swal.fire('Success', 'Registration successfully', 'success').then(() =>
          this.router.navigateByUrl('/dashboard')
        );
      },
      error: (err: any) => {
        Swal.fire('Error', err.message, 'error');
      },
    });
  }
}
