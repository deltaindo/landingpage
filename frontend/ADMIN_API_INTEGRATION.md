# Admin System - Backend API Integration Guide

## API Endpoints

The admin system connects to the following backend endpoints:

### Authentication

```
POST /api/auth/login
{
  email: string
  password: string
}
Response: { token, user }

GET /api/auth/me
Headers: Authorization: Bearer {token}
Response: { user }
```

### Blogs

```
GET /api/cms/admin/blogs?page=1&limit=10&search=keyword
Response: { data: Blog[], pagination }

GET /api/cms/admin/blogs/:id
Response: { data: Blog }
```

### Courses

```
GET /api/cms/admin/courses?page=1&limit=10&search=keyword&category=tech
Response: { data: Course[], pagination }

GET /api/cms/admin/courses/:id
Response: { data: Course }
```

### Schedules

```
GET /api/cms/admin/schedules?page=1&limit=10&courseId=id&status=active
Response: { data: Schedule[], pagination }

GET /api/cms/admin/schedules/:id
Response: { data: Schedule }
```

### Registrations

```
GET /api/cms/admin/registrations?page=1&limit=10&status=pending&search=keyword
Response: { data: Registration[], pagination }

GET /api/cms/admin/registrations/:id
Response: { data: Registration }
```

### Documents

```
GET /api/cms/admin/registration-documents?page=1&limit=10&registrationId=id
Response: { data: Document[], pagination }
```

### Forms

```
GET /api/cms/admin/form-templates?page=1&limit=10&search=keyword
Response: { data: FormTemplate[], pagination }
```

### Users

```
GET /api/cms/admin/users?page=1&limit=10&search=keyword&role=admin
Response: { data: User[], pagination }
```

### Dashboard

```
GET /api/cms/admin/stats
Response: { 
  data: { 
    counts: { blogs, courses, schedules, registrations, users, documents, formTemplates, pendingRegistrations },
    recent: { blogs, registrations }
  }
}
```

## Required Backend Updates

Ensure backend has these routes in place:

### 1. Auth Route Protection

Add middleware to verify JWT tokens:

```javascript
// In your auth middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### 2. Admin Routes Registration

Ensure these routes are registered in your server:

```javascript
app.use('/api/cms/admin', verifyToken, cmsAdminRoutes);
```

### 3. Response Format

All endpoints should return:

```typescript
{
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    showing: string;
  };
}
```

## Testing the Integration

### 1. Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@deltaindonesia.com","password":"password123"}'
```

### 2. Test Protected Endpoint

```bash
curl -X GET http://localhost:5000/api/cms/admin/blogs \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Verify Response Format

Ensure response includes:
- `success: true`
- `data` array or object
- `pagination` object (if applicable)

## Common Issues

### CORS Errors

Add to backend server:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### 401 Unauthorized

1. Verify token is being sent in Authorization header
2. Check token hasn't expired
3. Verify JWT_SECRET matches on backend

### 404 Not Found

1. Check endpoint URL matches exactly
2. Verify routes are registered in backend
3. Check route protection middleware

## Database Models Expected

Backend should have these database tables:

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  role VARCHAR(50),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

-- Blog Posts
CREATE TABLE "blogPosts" (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  code VARCHAR(100),
  category VARCHAR(100),
  certification BOOLEAN,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

-- Courses
CREATE TABLE courses (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  code VARCHAR(100),
  category VARCHAR(100),
  certification BOOLEAN,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

-- And so on for other tables...
```

## Pagination Implementation

For efficient pagination, ensure backend returns:

```typescript
{
  success: true,
  data: [...],
  pagination: {
    total: 250,      // Total items in database
    page: 1,         // Current page
    limit: 10,       // Items per page
    totalPages: 25,  // Math.ceil(total/limit)
    showing: "1 to 10" // Display string
  }
}
```

## Performance Considerations

1. **Limit Query Results**: Always paginate large datasets
2. **Index Frequently Queried Fields**: email, status, category
3. **Use Database Sorting**: Don't sort in application
4. **Implement Caching**: Cache frequently accessed data
5. **Use Transactions**: For multi-table operations

## Sample Backend Response

```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Advanced JavaScript",
      "code": "JS-101",
      "category": "Technical",
      "certification": true,
      "createdAt": "2025-01-15T10:30:00Z",
      "updatedAt": "2025-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "showing": "1 to 10"
  }
}
```

## Next Steps

1. Verify all endpoints are implemented in backend
2. Test each endpoint with curl/Postman
3. Ensure proper error handling
4. Test with actual frontend
5. Check database contains required tables
