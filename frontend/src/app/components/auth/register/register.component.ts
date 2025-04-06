import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ERole } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  roles = Object.values(ERole);
  allTechs: string[] = ['Angular', 'React', 'Java', 'Spring', 'Node.js'];
  filteredTechs: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNo: ['', [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      techStack: [[]],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).*$/)
      ]],
      techInput: ['']
    });

    this.filteredTechs = this.registerForm.get('techInput')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTechs.filter(tech =>
      tech.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.snackBar.open('Please fill all required fields correctly', 'Close', { duration: 5000 });
      return;
    }

    this.isLoading = true;
    const formValue = this.registerForm.value;

    // Prepare data for backend
    const registrationData = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phoneNo: formValue.phoneNo,
      role: formValue.role, // This should match ERole enum in Spring Boot
      techStack: formValue.techStack || [],
      address: formValue.address,
      postalCode: formValue.postalCode,
      password: formValue.password
    };

    this.authService.register(registrationData).subscribe({
      next: () => {
        this.snackBar.open('Registration successful! Please login.', 'Close', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        // Error already handled in AuthService
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  addTech(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      const techStack = this.registerForm.get('techStack')?.value || [];
      if (!techStack.includes(value)) {
        techStack.push(value);
        this.registerForm.get('techStack')?.setValue(techStack);
      }
      this.registerForm.get('techInput')?.setValue('');
    }
  }

  removeTech(tech: string): void {
    const techStack = this.registerForm.get('techStack')?.value || [];
    const index = techStack.indexOf(tech);
    if (index >= 0) {
      techStack.splice(index, 1);
      this.registerForm.get('techStack')?.setValue(techStack);
    }
  }
}
