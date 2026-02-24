# EmployMe

EmployMe is a SvelteKit web app for connecting job seekers and employers.  
The current implementation includes signup/login flows, a job seeker dashboard that lists jobs from MySQL, and an admin dashboard UI.

## Tech Stack

- SvelteKit 2 + Svelte 5
- Vite 7
- Tailwind CSS 4
- MySQL (`mysql2/promise`)
- Lucide Svelte icons

## Current Features

- User signup (`/signup`)
  - Loads roles from the database (excluding admin)
  - Creates user records in `users`
- User login (`/login`)
  - Verifies credentials against `users`
  - Sets `user_id` cookie session
- Job seeker dashboard (`/dashboard`)
  - Loads job listings with poster contact info via SQL join
  - Displays cards with expandable contact details
- Admin dashboard UI (`/admin/dashboard`)
  - Sidebar/top-nav layout
  - Job seeker table UI (currently seeded with static sample data)

## Project Structure

```text
src/
  lib/
    database.js                    # MySQL connection
  routes/
    +layout.svelte                 # Global layout + app.css
    +page.server.js                # Redirects to /login
    login/
      +page.svelte
      +page.server.js              # Login action
    signup/
      +page.svelte
      +page.server.js              # Roles load + signup action
    dashboard/
      +layout.svelte               # Job-seeker dashboard shell
      +page.server.js              # Loads job listings from DB
      +page.svelte                 # Job listing cards UI
    admin/dashboard/
      +layout.svelte               # Admin shell
      +page.svelte                 # Job seeker management table UI
    employer/dashboard/
      +page.svelte                 # Placeholder page
    about/
      +page.svelte                 # Placeholder page
```

## Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm
- MySQL running locally

## Database Setup

The app currently reads DB connection details from `src/lib/database.js`:

- host: `localhost`
- user: `root`
- password: empty string
- database: `employ_me`

Create a MySQL database named `employ_me` and required tables before running.

### Expected Core Tables

- `roles` (`id`, `role_name`)
- `users` (`id`, `role_id`, `email`, `password`, `id_number`, `name`, `phone_number`, ...)
- `job_listings` (`id`, `posted_by_user_id`, `title`, `location`, `salary_min`, `salary_max`, ...)

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173` by default.

## Available Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview production build locally
- `npm run check` - Svelte type and diagnostics checks
- `npm run check:watch` - checks in watch mode
- `npm run lint` - Prettier check + ESLint
- `npm run format` - format with Prettier

## Auth and Session Notes

- Login sets a cookie named `user_id` (`httpOnly`, `sameSite=lax`, 7-day max age).
- Root route currently redirects to `/login`.
- Passwords are currently compared as plain text (not yet hashed).

## Known Gaps / Next Improvements

- Move DB credentials to environment variables.
- Hash passwords using a secure algorithm (for example `bcrypt` or `argon2`).
- Add authorization guards for dashboard/admin routes.
- Replace static admin table data with real DB data.
- Add migrations and seed scripts for reproducible setup.
- Add tests for auth and server load/actions.
