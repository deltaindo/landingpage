# Delta Indonesia Admin System Documentation

## Overview

A complete, production-ready admin dashboard system for managing:
- Blog posts
- Training courses
- Course schedules
- User registrations
- Registration documents
- Form templates
- Admin users

## Features

✅ **Authentication**
- JWT-based login system
- Protected routes with role-based access control
- Session persistence with local storage
- Auto-logout on token expiration

✅ **Dashboard**
- Real-time statistics and analytics
- Key metrics visualization
- Quick action buttons
- System status monitoring

✅ **Data Management**
- Full CRUD operations for all 7 resource types
- Advanced data tables with:
  - Sorting and filtering
  - Pagination
  - Search functionality
  - Responsive design

✅ **Export Functionality**
- Export to CSV format
- Export to PDF format
- Export to JSON format
- Multi-sheet CSV support

✅ **UI Components**
- Responsive sidebar navigation
- Modal forms for editing
- Data tables with actions
- Status badges and indicators
- Loading states and error handling

## Project Structure

```
frontend/src/
├── app/
│   └── admin/
│       ├── login/
│       │   └── page.tsx          # Login page
│       ├── dashboard/
│       │   └── page.tsx          # Dashboard with stats
│       ├── blogs/
│       │   └── page.tsx          # Blog management
│       ├── courses/
│       │   └── page.tsx          # Course management
│       ├── schedules/
│       │   └── page.tsx          # Schedule management
│       ├── registrations/
│       │   └── page.tsx          # Registration management
│       ├── documents/
│       │   └── page.tsx          # Document management
│       ├── forms/
│       │   └── page.tsx          # Form template management
│       ├── users/
│       │   └── page.tsx          # User management
│       ├── settings/
│       │   └── page.tsx          # System settings
│       └── layout.tsx            # Admin root layout
├── components/
│   └── admin/
│       ├── Sidebar.tsx           # Navigation sidebar
│       ├── Header.tsx            # Page header
│       ├── DataTable.tsx         # Reusable data table
│       ├── Modal.tsx             # Reusable modal
│       ├── StatCard.tsx          # Statistics card
│       ├── ProtectedRoute.tsx    # Route protection
│       └── AdminLayout.tsx       # Admin layout wrapper
├── contexts/
│   └── AdminAuthContext.tsx      # Authentication context
└── lib/
    ├── api.ts                    # API client
    └── export.ts                 # Export utilities
```

## Installation

### 1. Install Dependencies

```bash
cd frontend
npm install
```

New dependencies added:
- `html2canvas`: ^1.4.1 - For HTML to canvas conversion (PDF export)
- `jspdf`: ^2.5.1 - For PDF generation

### 2. Environment Setup

Create `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run Development Server

```bash
npm run dev
```

Access admin panel at: `http://localhost:3000/admin/login`

## Usage

### Login

1. Navigate to `/admin/login`
2. Enter credentials:
   - Email: `admin@deltaindonesia.com`
   - Password: `password123` (demo)
3. Click "Sign In"

### Dashboard

After login, you'll see:
- 7 statistics cards with key metrics
- Quick action buttons for creating new items
- System status overview

### Managing Resources

Each resource (blogs, courses, etc.) has:

**List View:**
- Sortable columns
- Search functionality
- Pagination
- Export to CSV/PDF
- Edit/Delete actions

**Edit Modal:**
- Prepopulated form fields
- Input validation
- Save/Cancel buttons

### Exporting Data

Click the "Export" button on any data table to:
- Download CSV file
- Generate PDF report
- Export as JSON

## API Integration

All pages automatically fetch data from the backend:

```typescript
// API Client Methods
apiClient.getBlogs(page, limit, search)
apiClient.getCourses(page, limit, search, category)
apiClient.getSchedules(page, limit, courseId, status)
apiClient.getRegistrations(page, limit, status, search)
apiClient.getRegistrationDocuments(page, limit, registrationId)
apiClient.getFormTemplates(page, limit, search)
apiClient.getUsers(page, limit, search, role)
apiClient.getDashboardStats()
```

## Authentication Context

The `AdminAuthContext` provides:

```typescript
{
  user: AdminUser | null;              // Current user
  isLoading: boolean;                  // Loading state
  isAuthenticated: boolean;            // Auth status
  login: (email, password) => Promise<void>;
  logout: () => void;                  // Clear auth
  checkAuth: () => Promise<void>;      // Validate session
}
```

## Components

### DataTable

Features: Sorting, filtering, pagination, search, export

```typescript
<DataTable
  columns={columns}
  data={data}
  isLoading={isLoading}
  pagination={pagination}
  onPageChange={handlePageChange}
  onEdit={handleEdit}
  onDelete={handleDelete}
  searchable={true}
/>
```

### Modal

Reusable modal for forms

```typescript
<Modal
  isOpen={isOpen}
  title="Edit Item"
  onClose={handleClose}
  size="md" // sm, md, lg, xl
  footer={<Button>Save</Button>}
>
  {/* Form content */}
</Modal>
```

### StatCard

Display statistics

```typescript
<StatCard
  icon={Icon}
  label="Total Items"
  value={100}
  color="blue"
  trend={{ value: 12, isPositive: true }}
/>
```

## Export Functions

### Export to CSV

```typescript
import { exportToCSV } from '@/lib/export';

exportToCSV(data, {
  filename: 'data-export',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ],
});
```

### Export to PDF

```typescript
import { exportTableToPDF } from '@/lib/export';

const tableRef = useRef<HTMLTableElement>(null);
await exportTableToPDF(tableRef.current, 'report');
```

## Styling

All components use Tailwind CSS for styling. Color scheme:

- **Primary**: Indigo (600, 700, 800)
- **Success**: Green (100, 600, 800)
- **Warning**: Yellow (100, 800)
- **Danger**: Red (100, 600, 800)
- **Info**: Gray (100, 600, 800)

## Performance Optimizations

1. **API Caching**: Requests are cached where applicable
2. **Pagination**: Data loaded in chunks (default 10 per page)
3. **Lazy Loading**: Components load on demand
4. **Code Splitting**: Each page is a separate bundle

## Security

1. **JWT Authentication**: Token-based auth system
2. **Protected Routes**: Admin routes require authentication
3. **CORS**: API requests include proper headers
4. **Input Validation**: All forms validated before submission
5. **XSS Protection**: User input sanitized

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### 401 Unauthorized

- Check token in localStorage
- Re-login if token expired
- Verify API URL in .env.local

### CORS Errors

- Backend should enable CORS for frontend URL
- Check `http://localhost:5000/api` is accessible

### Data Not Loading

- Check browser console for errors
- Verify API endpoints in backend
- Check network tab for failed requests

## Development Guidelines

### Adding New Management Page

1. Create new page in `src/app/admin/[resource]/page.tsx`
2. Import AdminLayout, Header, DataTable
3. Implement data fetching with apiClient
4. Add route to Sidebar component
5. Use DataTable for display
6. Add Modal for edit forms

### Adding New API Endpoint

1. Add method to `apiClient` in `src/lib/api.ts`
2. Follow existing pattern with error handling
3. Return `ApiResponse<T>` type

## Deployment

### Build for Production

```bash
cd frontend
npm run build
npm start
```

### Environment Variables

Set in production:
- `NEXT_PUBLIC_API_URL`: Backend API URL

## Future Enhancements

- [ ] Real-time updates with WebSocket
- [ ] Advanced filtering options
- [ ] Custom report builder
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Role-based feature access
- [ ] Audit logging
- [ ] Bulk operations

## Support

For issues or questions:
1. Check this documentation
2. Review component props
3. Check browser console for errors
4. Contact development team

## License

Delta Indonesia © 2025
