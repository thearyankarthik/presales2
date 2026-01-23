import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { UsersListEmpComponent } from './users-list-emp/users-list-emp.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DatabackupsComponent } from './databackups/databackups.component';
import { ConfigureComponent } from './configure/configure.component';
import { LeadsListComponent } from './leads/leads-list/leads-list.component';
import { LeadCreateComponent } from './leads/lead-create/lead-create.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'users-list', component: UsersListEmpComponent },
  { path: 'datbackups', component: DatabackupsComponent },
  { path: 'configure', component: ConfigureComponent },
  { path: 'leads', component: LeadsListComponent },
  { path: 'leads/create', component: LeadCreateComponent },
  { path: 'projects', component: ProjectsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
