import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lead } from '../../models/lead.model';
import { LeadsService } from '../../services/leads.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lead-create',
  templateUrl: './lead-create.component.html',
  styleUrls: ['./lead-create.component.css'],
})
export class LeadCreateComponent {
  model: Lead = { name: '', phone: '', email: '', project: '', source: '' };

  projects = ['Amity', 'Patio', 'Santorini'];
  sources = ['Google', 'Website', 'Walk-in'];

  constructor(
    private leadsService: LeadsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  submit() {
    this.leadsService.create(this.model).subscribe({
      next: (res) => {
        this.toastr.success('Lead created');
        this.router.navigate(['/leads']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to create lead (backend not available)');
        this.router.navigate(['/leads']);
      },
    });
  }

  cancel() {
    this.router.navigate(['/leads']);
  }
}
