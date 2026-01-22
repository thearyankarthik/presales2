import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { ToastrService } from 'ngx-toastr';

interface Role {
  label: string;
  value: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  roles: Role[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Management', value: 'management' },
    { label: 'Sales Person', value: 'sales person' },
  ];

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  // Convenience getter for easy access in template
  get f() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.toastr.error('Please fill all required fields correctly!');
      return;
    }

    const formData = this.registrationForm.value;
    console.log('Form Data:', formData);

    this.registrationService.registerUser(formData).subscribe({
      next: (res: any) => {
        this.toastr.success('Registration successful!');
        this.registrationForm.reset();
      },
      error: (err: any) => {
        console.error(err);
        this.toastr.error('Registration failed. Please try again!');
      },
    });
  }
}
