# Supabase Setup Guide

## 1. Environment Variables

Copy `.env.example` to `.env` and add your Supabase credentials:

```bash
cp .env.example .env
```

Then edit `.env` and replace `your_anon_key_here` with your actual Supabase anon key.

## 2. Database Schema

Create a `contacts` table in your Supabase database with the following SQL:

```sql
-- Create contacts table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  level TEXT,
  department TEXT,
  instagram TEXT,
  facebook TEXT,
  tiktok TEXT,
  hasWhatsApp BOOLEAN DEFAULT false,
  groupPreference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your needs)
-- Allow all operations for now (you can restrict later)
CREATE POLICY "Enable all access for contacts" 
ON contacts FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_contacts_name ON contacts(name);
CREATE INDEX idx_contacts_department ON contacts(department);
CREATE INDEX idx_contacts_level ON contacts(level);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at 
BEFORE UPDATE ON contacts 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
```

## 3. Enable Realtime

In your Supabase dashboard:
1. Go to Database → Replication
2. Enable replication for the `contacts` table
3. This allows real-time updates across all connected clients

## 4. Usage in App

The app now uses `useSupabaseContacts` hook which provides:
- `contacts` - Array of all contacts
- `loading` - Loading state
- `error` - Error message if any
- `addContact(data)` - Add new contact
- `updateContact(id, updates)` - Update existing contact
- `deleteContact(id)` - Delete contact
- `refetch()` - Manually refetch contacts

## 5. Testing Connection

To test if Supabase is connected:
1. Start the dev server: `npm run dev`
2. Open browser console
3. You should see contacts being fetched
4. Try adding a contact - it should save to Supabase
5. Check your Supabase dashboard to see the data

## 6. Security Notes

- The `.env` file is gitignored to protect your keys
- Never commit your actual Supabase keys to version control
- Use Row Level Security (RLS) policies to secure your data
- The anon key is safe for client-side use with proper RLS policies
