// import { Component, OnInit } from '@angular/core';
// import { CommonModule, DatePipe } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { EmployeeService } from '../../services/employee.service';
// import { Employee } from '../../models/employee.model';

// @Component({
//   selector: 'app-users-list',
//   templateUrl: './users-list.component.html',
//   styleUrls: ['./users-list.component.css'],
//   standalone: true,
//   imports: [CommonModule, DatePipe, HttpClientModule]
// })
// export class UsersListComponent implements OnInit {

//   employees: Employee[] = [];
//   loading = false;
//   errorMessage = '';

//   constructor(private employeeService: EmployeeService) {}

//   ngOnInit(): void {
//     this.loadEmployees();
//   }

//   loadEmployees(): void {
//     this.loading = true;

//     this.employeeService.getEmployees().subscribe({
//       next: (data) => {
//         this.employees = data;
//         this.loading = false;
//       },
//       error: () => {
//         this.errorMessage = 'Error fetching users';
//         this.loading = false;
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class UsersListComponent implements OnInit {

  employees: Employee[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;

    // Mock data for UI testing
    this.employees = [
      { emp_id: 1, emp_first_name: 'Aryan', emp_middle_name: 'Karthik', emp_last_name: 'P', role_id: 1, emp_status: 'Active', created_on: new Date(2025, 0, 15), created_by: 'Admin' , modified_by: 'Admin', modified_on: new Date(2025, 0, 18) },
      { emp_id: 2, emp_first_name: 'Christopher', emp_middle_name: '', emp_last_name: 'Smith', role_id: 2, emp_status: 'Active', created_on: new Date(2025, 0, 20), created_by: 'Admin' },
      { emp_id: 3, emp_first_name: 'Bob', emp_middle_name: 'A', emp_last_name: 'Bob', role_id: 1, emp_status: 'Inactive', created_on: new Date(2025, 0, 10), created_by: 'Admin' , modified_by: 'John', modified_on: new Date(2025, 0, 12) }
    ];
    
    this.loading = false;
  }
}