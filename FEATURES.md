# Phonex - Student Contact Collector

## 🎨 Design
- **Dark Tech Theme** - Sleek dark background with neon accents (green, blue, purple)
- **Glass Morphism** - Modern frosted glass effects throughout
- **Neon Glow Effects** - Glowing buttons and interactive elements
- **Single Navigation Bar** - Simplified 2-tab interface (Add Contact | All Contacts)

## ✨ Features

### 📱 Add Contact Tab
- **Numeric Keypad** - Full dial pad with 0-9, *, # buttons
- **Save Button** - Tap to open student details form
- **WhatsApp Quick Launch** - Direct WhatsApp chat from entered number
- **Delete/Backspace** - Remove digits one by one

### 👨‍🎓 Multi-Step Contact Form (8 Steps - Animated!)
When you tap SAVE, you'll go through an engaging conversational flow:

**Step 1: Name** 
- "What's their name?"
- Phone number shown for reference

**Step 2: Level Selection**
- "What level?"
- Interactive grid of buttons (100-500 Level, Graduate)
- Auto-advances when you select

**Step 3: Department**
- "Department?"
- Enter their field of study

**Step 4: Instagram**
- "Instagram?"
- Optional - with Skip button
- Pink gradient theme

**Step 5: Facebook**
- "Facebook?"
- Optional - with Skip button
- Blue theme

**Step 6: TikTok**
- "TikTok?"
- Optional - with Skip button
- Gray theme

**Step 7: Email**
- "Email?"
- Optional - with Skip button
- Green gradient theme

**Step 8: Overview & Preferences**
- Beautiful animated summary with all info
- WhatsApp checkbox
- **Group Preference Selection:**
  - "Add me to the group" - Join student network
  - "Just private chat" - One-on-one only
- **Privacy Notice:** 🔒 Your info stays safe
- Confirm and save

✨ **Features:**
- Progress bar shows completion (Step X of 8)
- Smooth fade-in animations between steps
- Back button to edit any previous step
- Skip buttons for all social media fields
- Friendly, conversational questions
- Transparent about data usage
- Hover effects and scale animations

### 📇 All Contacts Tab
- **Search Functionality** - Search by name, phone, level, or department
- **Contact Counter** - Shows total number of saved contacts
- **Contact Cards** with:
  - Avatar with initials
  - Name and phone number
  - Level and Department badges
  - Email (if provided)
  - WhatsApp indicator
- **Actions**:
  - **Chat Button** - Opens WhatsApp chat (if contact has WhatsApp)
  - **Edit Button** - Modify contact details
  - **Delete Button** - Remove contact with confirmation

## 💾 Data Storage
- All contacts saved to **localStorage**
- Data persists across browser sessions
- No server required - works offline

## 🎯 Perfect For
- Student organizations
- Class representatives
- Campus clubs
- Study groups
- Event organizers
- Anyone collecting student contacts

## 💚 WhatsApp Integration
- **Automatic Country Code** - Automatically adds Nigeria country code (+234) if not present
- **Smart Number Formatting** - Converts 0801234567 to 2348012345678
- **Official WhatsApp Logo** - Uses authentic WhatsApp branding
- **Direct Chat Launch** - Opens WhatsApp web/app directly

## 🚀 Tech Stack
- React 18
- Vite (Fast dev server)
- TailwindCSS (Dark theme)
- Lucide Icons + Custom WhatsApp Logo
- LocalStorage API

## 🎨 Color Palette
- **Primary (Neon Green)**: #00ff9d
- **Secondary (Neon Blue)**: #00d4ff
- **Accent (Neon Purple)**: #b000ff
- **WhatsApp Green**: #25D366
- **Dark Backgrounds**: #0a0a14, #0f0f1e, #1a1a2e, #16213e

## 📱 Usage Flow
1. Enter student's phone number on keypad
2. Tap the glowing SAVE button
3. Fill in student details (name, level, department, etc.)
4. Save to localStorage
5. View all contacts in "All Contacts" tab
6. Chat on WhatsApp or edit/delete as needed

---

**Built with ❤️ for students by students**
