# Backend Setup Guide

This is the backend API for the landing page project. It uses Node.js/Next.js with PostgreSQL database.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/download/) (v12 or higher)
- [pgAdmin 4](https://www.pgadmin.org/download/) (for database management)

## Installation Steps

### 1. Install PostgreSQL and pgAdmin 4

#### Windows:
1. Download PostgreSQL installer from [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. During installation, set your PostgreSQL password (remember this!)
4. The installer will also install pgAdmin 4 automatically
5. Default PostgreSQL port is `5432`

#### Linux (Ubuntu/Debian):
```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install pgAdmin 4
# Add repository
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list'

# Update and install
sudo apt update
sudo apt install pgadmin4
```

#### macOS:
```bash
# Using Homebrew
brew install postgresql@15
brew install --cask pgadmin4

# Start PostgreSQL
brew services start postgresql@15
```

### 2. Configure PostgreSQL Database

#### Using pgAdmin 4:
1. Open pgAdmin 4
2. Connect to your PostgreSQL server (default: localhost, port 5432)
3. Create a new database for your project (e.g., `landingpage_db`)

#### Using psql (Command Line):
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE landingpage_db;

# Exit
\q
```

### 3. Install Project Dependencies

Navigate to the backend directory and install Node.js dependencies:

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend directory with your database credentials:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/landingpage_db
PORT=3001
NODE_ENV=development
```

Replace `your_password` with your PostgreSQL password.

### 5. Run Database Seeders

**Important:** Run the seeder files in the following order:

```bash
# Navigate to your database directory or wherever seed files are located
# Run seeders in order using psql:

# 1. First, run the main seeder
psql -U postgres -d landingpage_db -f seeder.sql

# 2. Then run the courses seeder
psql -U postgres -d landingpage_db -f courses-seeder.sql

# 3. Finally, run the 2026 training seeder
psql -U postgres -d landingpage_db -f 2026-training-seeder-Final.sql
```

**Alternative: Using pgAdmin 4:**
1. Open pgAdmin 4
2. Navigate to your database (`landingpage_db`)
3. Right-click on the database → Query Tool
4. Open each SQL file in order and execute them:
   - `seeder.sql`
   - `courses-seeder.sql`
   - `2026-training-seeder-Final.sql`

### 6. Start the Development Server

After seeding the database, start the application:

```bash
npm run dev
```

The backend server should now be running on `http://localhost:3001` (or your configured port).

## Verification

To verify everything is working:

1. Check if the server is running by visiting `http://localhost:3001` in your browser
2. Verify database connection by checking server logs
3. Use pgAdmin 4 to inspect the database tables and data

## Common Issues

### PostgreSQL Connection Error
- Ensure PostgreSQL service is running
- Verify credentials in `.env` file
- Check if port 5432 is available

### Seeder Errors
- Make sure to run seeders in the correct order
- Ensure database exists before running seeders
- Check for syntax errors in SQL files

### Port Already in Use
- Change the PORT value in `.env` file
- Kill the process using the port: `lsof -ti:3001 | xargs kill` (macOS/Linux)

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [pgAdmin Documentation](https://www.pgadmin.org/docs/)
- [Node.js Best Practices](https://nodejs.org/en/docs/)

---

## Quick Start Summary

```bash
# 1. Install PostgreSQL & pgAdmin 4
# 2. Create database
# 3. Install dependencies
npm install

# 4. Run seeders in order
psql -U postgres -d landingpage_db -f seeder.sql
psql -U postgres -d landingpage_db -f courses-seeder.sql
psql -U postgres -d landingpage_db -f 2026-training-seeder-Final.sql

# 5. Start server
npm run dev
```