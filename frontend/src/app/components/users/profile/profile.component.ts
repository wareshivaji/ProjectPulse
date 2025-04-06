import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading = false;
  currentUser: any;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      techStack: [[]],
      address: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.currentUser = this.authService.currentUserValue;
    
    if (this.currentUser) {
      this.profileForm.patchValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        email: this.currentUser.email,
        phoneNo: this.currentUser.phoneNo,
        techStack: this.currentUser.techStack || [],
        address: this.currentUser.address,
        postalCode: this.currentUser.postalCode
      });
    }
    
    this.isLoading = false;
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading = true;
    const formValue = this.profileForm.value;

    this.userService.updateProfile(formValue).subscribe({
      next: (updatedUser) => {
        this.snackBar.open('Profile updated successfully', 'Close', { duration: 5000 });
        this.authService.updateCurrentUser(updatedUser);
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Failed to update profile', 'Close', { duration: 5000 });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  addTech(event: any): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const techStack = this.profileForm.get('techStack')?.value || [];
      techStack.push(value.trim());
      this.profileForm.get('techStack')?.setValue(techStack);
    }

    if (input) {
      input.value = '';
    }
  }

  removeTech(tech: string): void {
    const techStack = this.profileForm.get('techStack')?.value || [];
    const index = techStack.indexOf(tech);

    if (index >= 0) {
      techStack.splice(index, 1);
      this.profileForm.get('techStack')?.setValue(techStack);
    }
  }
}