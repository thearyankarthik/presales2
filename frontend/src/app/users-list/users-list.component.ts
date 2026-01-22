// users-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  loading = true;

  constructor(
    private regService: RegistrationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.regService.getUsers().subscribe({
      next: (res: any) => {
        if (res.success) this.users = res.data;
        else this.toastr.error('Failed to fetch users');
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.toastr.error('Error fetching users');
        this.loading = false;
      },
    });
  }
}
