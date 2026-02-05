# Database Migration to PostgreSQL with Supabase

## Completed Steps
- [x] Updated `prisma/schema.prisma` to use PostgreSQL provider
- [x] Installed `@supabase/supabase-js` package
- [x] Created `src/lib/supabase.ts` for Supabase client
- [x] Ran `npx prisma generate` to regenerate Prisma client

## Pending Steps
- [x] Update `.env` file with Supabase credentials:
  - Add `DATABASE_URL` with Supabase PostgreSQL connection string
  - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase project URL
  - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase anon key
- [x] Run `npx prisma db push` to create tables in Supabase
- [x] Run `npx prisma db seed` to populate initial data (if needed)
- [x] Test the application to ensure everything works with PostgreSQL

## Instructions
1. Go to your Supabase dashboard and get the connection details
2. Update the `.env` file with the following variables:
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
   NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
   ```
3. Run the pending commands to complete the migration
