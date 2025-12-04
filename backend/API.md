# Blog CMS API Documentation

## Authentication

All admin endpoints require Bearer token authentication.

### Login

POST /api/auth/login
Body: { email, password }
Returns: { success, token, user }

## Blog Posts

### List All Posts

GET /api/blogs?page=1&limit=10&status=published&search=keyword

### Get Single Post

GET /api/blogs/:slug

### Create Post

POST /api/blogs
Headers: Authorization: Bearer <token>
Body: BlogPost object

### Update Post

PUT /api/blogs/:id
Headers: Authorization: Bearer <token>

### Delete Post

DELETE /api/blogs/:id

### Bulk Actions

POST /api/blogs/bulk/publish
POST /api/blogs/bulk/delete
Body: { ids: [id1, id2, ...] }

## Media Library

### List Media

GET /api/media?page=1&limit=20

### Upload Media

POST /api/media
Content-Type: multipart/form-data
Body: file

### Update Media

PUT /api/media/:id
Body: { alt, caption }

### Delete Media

DELETE /api/media/:id

## Categories & Tags

### List Categories

GET /api/categories

### Create Category

POST /api/categories
Body: { name, slug, description }

### List Tags

GET /api/tags

### Create Tag

POST /api/tags
Body: { name, slug }
