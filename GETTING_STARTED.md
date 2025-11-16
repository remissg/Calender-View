# Getting Started Guide

## ✅ Project Setup Complete!

Your Calendar View component is now ready to use. All files have been created and dependencies installed.

## 🚀 Running the Project

### Development Server
The application is currently running at:
- **URL:** http://localhost:7385/
- **Command:** `npm run dev`

### Storybook
Storybook is currently running at:
- **URL:** http://localhost:6006/
- **Command:** `npm run storybook`

## 📂 Project Structure

```
Calender View/
├── .storybook/           # Storybook configuration
│   ├── main.ts
│   └── preview.ts
├── src/
│   ├── components/
│   │   ├── Calendar/     # Main calendar components
│   │   │   ├── CalendarView.tsx
│   │   │   ├── CalendarView.types.ts
│   │   │   ├── CalendarView.stories.tsx
│   │   │   ├── MonthView.tsx
│   │   │   ├── WeekView.tsx
│   │   │   ├── CalendarCell.tsx
│   │   │   └── EventModal.tsx
│   │   └── primitives/   # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       ├── Input.tsx
│   │       └── Select.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useCalendar.ts
│   │   └── useEventManager.ts
│   ├── utils/            # Utility functions
│   │   ├── date.utils.ts
│   │   └── event.utils.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🎯 Next Steps

### 1. Initialize Git Repository

```bash
cd "c:\Users\aksyd.LAPTOP-B2G7R8LJ\OneDrive\Desktop\Websites and Assignments\Calender View"
git init
git add .
git commit -m "feat: initial calendar view component implementation"
```

### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `calendar-view-[yourname]`
3. Make it public
4. Don't initialize with README (we already have one)

```bash
git remote add origin https://github.com/yourusername/calendar-view-[yourname].git
git branch -M main
git push -u origin main
```

### 3. Deploy Storybook

#### Option A: Chromatic (Recommended)

```bash
# Install Chromatic
npm install --save-dev chromatic

# Deploy (you'll need to create a project on chromatic.com first)
npx chromatic --project-token=YOUR_TOKEN
```

#### Option B: Vercel

```bash
# Build Storybook
npm run build-storybook

# Deploy to Vercel
npx vercel --prod
```

#### Option C: Netlify

```bash
# Build Storybook
npm run build-storybook

# Deploy the storybook-static folder to Netlify
# You can drag and drop the folder on netlify.com
```

### 4. Update README with Links

After deploying, update the README.md with:
- Your GitHub repository URL
- Your deployed Storybook URL
- Your contact information

## 🎨 Available Features

### ✅ Completed Features

- [x] Month View with 42-cell grid
- [x] Week View with time slots
- [x] Event creation, editing, deletion
- [x] Modal form with validation
- [x] Color picker (8 colors)
- [x] Category selection
- [x] Responsive design (mobile, tablet, desktop)
- [x] Keyboard navigation
- [x] ARIA labels and accessibility
- [x] Performance optimizations (React.memo, useCallback, useMemo)
- [x] TypeScript strict mode
- [x] Tailwind CSS styling
- [x] Storybook documentation (7 stories)

## 🧪 Testing the Application

### Try These Features:

1. **Create Event**: Click on any date cell or the "+ Add Event" button
2. **Edit Event**: Click on an existing event
3. **Delete Event**: Open an event and click "Delete Event"
4. **Navigate**: Use Previous/Next buttons or "Today" button
5. **Switch Views**: Toggle between Month and Week views
6. **Keyboard**: Use Tab, Enter, Arrow keys to navigate
7. **Responsive**: Resize the browser window to see responsive design

## 📊 Storybook Stories

Open http://localhost:6006/ and explore:

1. **Default** - Sample events in month view
2. **Empty** - Empty calendar state
3. **Week View** - Time-slot based week view
4. **Large Dataset** - 50+ events for performance testing
5. **Interactive Playground** - Fully functional demo
6. **Mobile View** - Mobile responsive layout
7. **Current Month** - Today's date highlighted

## 🐛 Troubleshooting

### Port Already in Use

If port 7385 or 6006 is in use:
```bash
# For dev server
npm run dev
# Will automatically use next available port

# For Storybook
npm run storybook -- -p 6007
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Check TypeScript configuration
npx tsc --noEmit
```

## 📝 Submission Checklist

Before submitting:

- [ ] All features working correctly
- [ ] No console errors
- [ ] Git repository created and pushed
- [ ] Storybook deployed and accessible
- [ ] README updated with your information
- [ ] At least 5 meaningful git commits
- [ ] Code formatted and linted
- [ ] Tested on mobile, tablet, and desktop
- [ ] Keyboard navigation tested
- [ ] All Storybook stories working

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all dependencies are installed: `npm install`
3. Ensure Node.js version is 18 or higher: `node --version`
4. Check the terminal output for detailed error messages

## 🎓 Learning Resources

- **React Docs**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Storybook**: https://storybook.js.org/docs
- **date-fns**: https://date-fns.org/docs
- **Accessibility**: https://www.w3.org/WAI/WCAG21/quickref/

---

Good luck with your assignment! 🚀
