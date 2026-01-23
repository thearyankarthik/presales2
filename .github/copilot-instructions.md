# AI Coding Agent Instructions for PresalesCRMFrontEnd

## Project Overview
**PresalesCRMFrontEnd** is an Angular 16 CRM dashboard application for managing sales leads, projects, employees, and system configurations. Built with Angular Material (layout), PrimeNG (data tables/dialogs), and RxJS (reactive state management).

## Critical Architecture Understanding

### Project Structure
This is a **monorepo with dual source directories**:
- **`src/app`** - Main development location (what you should modify)
- **`frontend/src/app`** - Appears to be a reference/template copy (avoid editing)

Work exclusively in `src/` unless explicitly told otherwise.

### Core Feature Modules
Located in `src/app/` with service boundaries:
- **Leads** (`leads/`) - Sales lead management with list/create views, uses `LeadsService`
- **Dashboard** - Analytics/visualization via `ng2-charts` (Chart.js)
- **Users** (`users-list-emp/`) - Employee directory, uses `RegistrationService`
- **Projects** - Project tracking
- **Registration** - Employee onboarding forms
- **Configure** - System settings
- **DataBackups** - Backup management

### Navigation & Routing
- Default route: `/dashboard` (set in `app-routing.module.ts`)
- Sidenav menu in `AppComponent` with route-based item highlighting
- Menu routes: Dashboard, Leads, Users, Project
- **Note**: Typo in route config: `datbackups` vs component `databackups`

### Key Data Model
**Lead** (primary entity in `src/app/models/lead.model.ts`):
```typescript
{
  id?: string;           // unique identifier
  name: string;          // required
  phone: string;         // required  
  email?: string;        // optional
  project?: string;      // project assignment
  source?: string;       // lead origin (Google, Website, etc)
  assignedTo?: string;   // sales person name
  status?: string;       // lead status
  createdAt?: string;    // timestamp
}
```

## Service & HTTP Pattern

### Backend Integration
- **Currently**: Mock data via `of(mock)` in `LeadsService.getAll()` for frontend development
- **Target Backend**: REST API at `http://localhost:8000/api/leads` (configurable)
- All services use `HttpClient` for REST communication
- Services return `Observable<T>` - **never subscribe outside components**

### Service Architecture Pattern
```typescript
@Injectable({ providedIn: 'root' })
export class SomeService {
  private baseUrl = 'http://localhost:8000/api/endpoint';
  
  constructor(private http: HttpClient) {}
  
  getAll(): Observable<Model[]> {
    return this.http.get<Model[]>(this.baseUrl);
  }
  
  getById(id: string): Observable<Model> {
    return this.http.get<Model>(`${this.baseUrl}/${id}`);
  }
  
  create(item: Model): Observable<Model> {
    return this.http.post<Model>(this.baseUrl, item);
  }
  
  update(id: string, item: Model): Observable<Model> {
    return this.http.put<Model>(`${this.baseUrl}/${id}`, item);
  }
  
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
```

## Component Convention

### Lifecycle Pattern
```typescript
export class SomeComponent implements OnInit, OnDestroy {
  data: Model[] = [];
  private subscriptions: Subscription[] = [];
  
  constructor(private service: SomeService, private router: Router) {}
  
  ngOnInit(): void {
    this.loadData();
  }
  
  private loadData(): void {
    const sub = this.service.getAll().subscribe(
      (data) => (this.data = data)
    );
    this.subscriptions.push(sub);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
```

### Current Reality vs Best Practice
**⚠️ Current state**: Many components subscribe without explicit cleanup (memory leak risk)
- `LeadsListComponent` - no `OnDestroy` cleanup
- `UsersListEmpComponent` - same issue
- **Exception**: `AppComponent` correctly implements cleanup (see its subscription management)

**Action for new code**: Always implement `OnDestroy` with subscription cleanup OR use async pipe in templates.

### Template Patterns
- Use **async pipe** in templates when possible: `*ngIf="data$ | async as data"`
- Material for layout: `<mat-sidenav>`, `<mat-toolbar>`, `<mat-table>`
- PrimeNG for data operations: `<p-table>`, `<p-dialog>`, `<p-dropdown>`
- **FilterByPipe** usage: `items | filterBy:searchText:['name','phone']` (custom implementation in `src/app/pipes/`)
- Reactive Forms with `FormGroup`, `FormControl` (not template-driven forms)

## UI Component Libraries

### Material vs PrimeNG Distribution
- **Angular Material**: Layout & navigation (MatSidenav, MatToolbar, MatTable, MatIcon, MatList)
- **PrimeNG**: Rich data operations (Table, Dialog, Dropdown, FileUpload, Calendar, Carousel, TabView)
- **ngx-toastr**: Toast notifications (injected as `ToastrService`)
- **ng2-charts**: Dashboard charts with Chart.js

### Common Patterns
```typescript
// Toast notifications
this.toastr.success('Saved successfully');
this.toastr.error('Error occurred');

// Navigation
this.router.navigate(['/leads/create']);
```

## Build & Development Workflows

### Essential Commands
```bash
npm start      # ng serve @ http://localhost:4200 (auto-reload on file changes)
npm build      # Production build → dist/presales-crmfront-end/
npm test       # Unit tests via Karma + Jasmine
npm run watch  # Watch mode for continuous dev build
```

### File Naming Conventions
- **Components**: `feature.component.ts|html|css` (e.g., `leads-list.component.ts`)
- **Services**: `feature.service.ts` (decorated with `@Injectable({ providedIn: 'root' })`)
- **Models**: `feature.model.ts` (TypeScript interfaces, not classes)
- **Pipes**: `feature.pipe.ts` (implements `PipeTransform` interface)
- **Specs**: `feature.component.spec.ts` (Jasmine/Karma tests)

### Angular CLI Scaffolding
```bash
ng generate component feature-name          # scaffold component
ng generate service feature-name            # scaffold service
ng generate pipe feature-name               # scaffold pipe
ng generate module feature-name             # scaffold module (for lazy loading)
```

## Testing
- **Framework**: Jasmine + Karma (configured in `karma.conf.js`)
- **All components have `*.spec.ts` files** generated via CLI
- Run: `npm test` or `ng test`
- Common pattern: Import service, mock via `TestBed.configureTestingModule`

## Key Gotchas & Known Issues

1. **Subscription Leaks**: Many components use `.subscribe()` without cleanup - implement `OnDestroy` in new code
2. **Route Typo**: `'datbackups'` in routing should be `'databackups'` to match component
3. **Mock Data**: `LeadsService.getAll()` returns mock data - switch to HTTP when backend ready
4. **Module Duplication**: Two `src/` trees exist (root and `frontend/`); work in root `src/`
5. **No Lazy Loading**: All routes eagerly loaded - consider lazy loading for scalability

## Development Quick Reference

### To Add a New Lead-Related Feature
1. Create component: `ng generate component leads/my-feature`
2. Add route in `app-routing.module.ts`: `{ path: 'leads/my-feature', component: MyFeatureComponent }`
3. Inject `LeadsService` in component
4. Implement `OnInit` to load data, `OnDestroy` to cleanup subscriptions
5. Use `*ngIf="leads | async"` or store in component property and unsubscribe on destroy
6. Add menu item to `AppComponent.allMenuItems` if needed

### To Connect to Real Backend
In each service, replace mock `of()` return with actual HTTP call:
```typescript
// Before (mock):
getAll(): Observable<Lead[]> {
  const mock: Lead[] = [...];
  return of(mock);
}

// After (real):
getAll(): Observable<Lead[]> {
  return this.http.get<Lead[]>(this.baseUrl);
}
```

### Common Import Mistakes
- Use relative imports for local code: `import { Lead } from '../../models/lead.model'`
- Use barrel exports where available
- Don't forget `HttpClientModule` in `app.module.ts` for services with HTTP

## Code Quality Standards
- **TypeScript strict mode**: Enabled in `tsconfig.json` - fix type errors
- **File organization**: Components organize by feature domain, not by file type
- **Naming**: PascalCase for classes, camelCase for properties/methods
- **Comments**: Add comments for "why", not "what" - code is self-documenting
