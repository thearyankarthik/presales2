# AI Coding Agent Instructions for PresalesCRMFrontEnd

## Project Overview
**PresalesCRMFrontEnd** is an Angular 16 CRM dashboard application for managing sales leads, projects, users, and configurations. Built with Angular Material, PrimeNG, and RxJS for UI and reactive state management.

## Architecture

### Core Structure
- **Components**: Located in `src/app/`, organized by feature (leads/, dashboard/, registration/, etc.)
- **Services**: HTTP-based APIs in `src/app/services/` (LeadsService, RegistrationService)
- **Models**: TypeScript interfaces in `src/app/models/` (Lead interface defines core data structure)
- **Pipes**: Custom filtering logic (`FilterByPipe` for list searching)
- **Routing**: SPA with feature routes in `app-routing.module.ts`, default redirect to `/dashboard`

### Technology Stack
- **Angular 16** (core framework)
- **Material Design**: MatSidenav, MatTable, MatToolbar for layout/navigation
- **PrimeNG 16**: TableModule, DialogModule, DropdownModule for rich components
- **RxJS 7.8**: Observable patterns with `.subscribe()` for async operations
- **ngx-toastr**: Toast notifications via `ToastrService`
- **ng2-charts**: Dashboard charting with Chart.js

### Key Data Model
**Lead interface** (`src/app/models/lead.model.ts`):
```typescript
{ id, name, phone, email, project, source, assignedTo, status, createdAt }
```
This is the primary entity - understand this when working with leads features.

## Service Patterns & Backend Integration

### HTTP Services Pattern
Services use `HttpClient` for REST communication. Example [LeadsService](src/app/services/leads.service.ts):
- Base URL: `http://localhost:8000/api/leads` (configurable for production)
- Methods return `Observable<T>` (never subscribe outside components)
- **Currently uses mock data** (`of(mock)` in `getAll()`) for frontend development
- Switch to real HTTP when backend is ready

### Data Flow
1. Component calls service method → returns Observable
2. Component subscribes in template (async pipe) or in code
3. Service handles HTTP errors (interceptors configured in app.module.ts)

## Component Conventions

### Lifecycle Pattern
```typescript
export class SomeComponent implements OnInit {
  data: Model[] = [];
  
  constructor(private service: SomeService, private router: Router) {}
  
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.service.getAll().subscribe((data) => (this.data = data));
  }
}
```
- Always unsubscribe in `ngOnDestroy` or use async pipe in templates
- Router injection for navigation (`this.router.navigate([path])`)

### Template Patterns
- **Material sidenav** for main layout ([app.component.ts](src/app/app.component.ts))
- **PrimeNG Table** for data lists with filtering
- **Reactive Forms** with `FormGroup`, `FormControl` (not template-driven)
- Custom pipe usage: `items | filterBy:searchText:['name','phone']`

## Testing
- **Unit tests**: Karma + Jasmine (`*.spec.ts` files)
- **Command**: `npm test` (or `ng test`)
- All components have spec files generated with CLI

## Build & Development Workflow

### Commands
```bash
npm start        # ng serve @ http://localhost:4200 (auto-reload)
npm build        # Production build → dist/presales-crmfront-end/
npm test         # Unit tests via Karma
npm run watch    # Watch mode for development
```

### File Naming Conventions
- Components: `feature.component.ts|html|css` (e.g., `leads-list.component.ts`)
- Services: `feature.service.ts` (injected with `providedIn: 'root'`)
- Models: `feature.model.ts` (TypeScript interfaces)
- Pipes: `feature.pipe.ts` (implements `PipeTransform`)

## Important Conventions & Quirks

### Subscription Management
- Components use direct `.subscribe()` without explicit unsubscribe in some cases
- AppComponent uses `Subscription` property with proper cleanup in `ngOnDestroy`
- **Recommendation**: Use async pipe in templates or implement `OnDestroy` for subscriptions

### Material vs PrimeNG
- **Layout/Navigation**: Material (MatSidenav, MatTable, MatToolbar)
- **Data display/Forms**: PrimeNG (Table, Dialog, Dropdown, Calendar)
- Both libraries imported in `app.module.ts`; add new imports there

### Routing Notes
- Default route redirects to `/dashboard`
- Typo in routes: `datbackups` (should likely be `databackups`)
- No route guards currently implemented

### Environment Configuration
- Base API URL hardcoded in services (change to environment-based in `src/environments/`)
- Mock data used for development; switch to HTTP calls when backend ready

## Common Tasks

### Adding a New Feature Component
1. Generate: `ng generate component features/feature-name`
2. Add route in `app-routing.module.ts`
3. Create service in `src/app/services/feature.service.ts`
4. Import new modules in `app.module.ts` if needed (Material/PrimeNG)
5. Update menu items in AppComponent if needed

### Adding HTTP Endpoints
1. Create/update service method returning `Observable<T>`
2. Inject `HttpClient` in service constructor
3. Call from component, subscribe and assign to component property
4. Bind in template with async pipe or direct binding

### Styling
- Global styles in `src/styles.css`
- Component styles: `*.component.css` (isolated to component)
- Material theme: `indigo-pink.css` (configured in angular.json)

## Integration Points & External Dependencies

- **Backend API**: Node/Express server @ `localhost:8000/api` (mock currently)
- **Notifications**: ngx-toastr integrated globally
- **State Management**: No Redux/NgRx; direct Observable subscriptions in components
- **Forms**: Reactive Forms Module (not NgModel template-driven)
