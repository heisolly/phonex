# Quick Start - Supabase Integration

## ⚡ Quick Setup (5 minutes)

### Step 1: Add Your Supabase Key
Open the `.env` file and replace `your_anon_key_here` with your actual anon key:

```env
VITE_SUPABASE_URL=https://nostchdibyqdorrmcgih.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_from_supabase
```

### Step 2: Create Database Table
Go to your Supabase SQL Editor and run this:

```sql
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

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for contacts" 
ON contacts FOR ALL 
USING (true) 
WITH CHECK (true);
```

### Step 3: Enable Realtime (Optional)
1. Go to Database → Replication in Supabase
2. Toggle ON for `contacts` table

### Step 4: Start the App
```bash
npm run dev
```

## ✅ What's Working Now

- ✅ **Supabase installed** and configured
- ✅ **Real-time sync** - Changes appear instantly across all devices
- ✅ **Cloud storage** - All contacts saved to Supabase
- ✅ **Loading states** - Shows spinner while fetching data
- ✅ **Error handling** - Shows helpful error messages
- ✅ **Auto-sync** - Contacts automatically sync on changes

## 🎯 Test It

1. Add a contact in the app
2. Check your Supabase dashboard → Table Editor → contacts
3. You should see the contact there!
4. Try editing/deleting - changes sync instantly

## 🔒 Security Note

Your `.env` file is already gitignored, so your keys are safe!

## 📚 Need More Help?

See `SUPABASE_SETUP.md` for detailed documentation.
