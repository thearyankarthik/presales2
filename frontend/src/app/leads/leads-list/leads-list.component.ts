import { Component, OnInit } from '@angular/core';
import { LeadsService } from '../../services/leads.service';
import { Lead } from '../../models/lead.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.css'],
})
export class LeadsListComponent implements OnInit {
  leads: Lead[] = [];
  filterText = '';

  constructor(private leadsService: LeadsService, private router: Router) {}

  ngOnInit(): void {
    this.loadLeads();
  }

  loadLeads(): void {
    this.leadsService.getAll().subscribe((data) => (this.leads = data));
  }

  goToCreate(): void {
    this.router.navigate(['/leads/create']);
  }

  edit(lead: Lead) {
    // navigate to edit page later
    console.log('edit', lead);
  }

  delete(lead: Lead) {
    // call service delete later
    console.log('delete', lead);
  }
}
