# Supabase Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Getting Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to Settings > API
4. Copy the following values:
   - **Project URL**: Use this for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public**: Use this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Database Schema

Make sure your Supabase database has the following table:

### Admin Table
```sql
CREATE TABLE admin (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  updated_at TIMESTAMPTZ,
  fullname VARCHAR
);
```

## Testing Admin Login

Use the credentials from your admin table:
- **Email**: `admin@razcapital.com`
- **Password**: `Admin@12345`

## Security Notes

- In production, never store plain-text passwords
- Use Supabase Auth or implement proper password hashing
- Consider implementing rate limiting for login attempts
- Use environment variables for all sensitive configuration
