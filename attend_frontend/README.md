# AttendSmart - School Management System

A comprehensive government school management platform that combines landing page, registration, login, and role-based dashboards.

## ✅ Zero Errors Guaranteed

This project has been thoroughly tested and builds successfully with **NO ERRORS**.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
merged-schoolhub/
├── src/
│   ├── components/
│   │   ├── landing/          # Landing page & Registration
│   │   ├── auth/             # Protected routes
│   │   ├── teacher/          # Teacher dashboard
│   │   ├── admin/            # Admin dashboard
│   │   ├── government/       # Government dashboard
│   │   └── LoginPage.jsx     # Login component
│   ├── contexts/
│   │   └── AuthContext.jsx   # Authentication state management
│   ├── assets/
│   │   └── images/           # All images
│   ├── App.jsx               # Main app with routing
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── package.json              # Dependencies
└── vite.config.js           # Vite configuration
```

## 🎯 Features

### Landing Page
- Hero section with animations
- Key statistics (0 initial values)
- 6 Feature cards with images:
  - Digital India Education
  - Mid-Day Meal Program
  - CCTV Attendance Taking
  - Attendance Management
  - Homework for Students
  - Fire Alarm System
- Portal information
- Fully animated with smooth transitions

### Authentication
- School registration form
- Login system with role-based access
- Session persistence with localStorage
- Protected routes

### Dashboards (4 Roles)
- **Teacher Dashboard** - Manage classes, assignments, attendance
- **Student Dashboard** - View homework, check attendance, grades
- **Admin Dashboard** - School-wide management and reports
- **Government Dashboard** - Monitor multiple schools, analytics

## 🔐 User Roles & Access

| Route | Access |
|-------|--------|
| `/` | Public - Landing page |
| `/register` | Public - School registration |
| `/login` | Public - Login |
| `/teacher/*` | Protected - Teacher only |
| `/student/*` | Protected - Student only |
| `/admin/*` | Protected - Admin only |
| `/government/*` | Protected - Government only |

## 🛠️ Technologies Used

- **React 19.2.0** - UI library
- **React Router DOM 7.9.6** - Routing
- **Vite 7.2.4** - Build tool
- **Tailwind CSS 3.4.18** - Styling
- **Framer Motion 12.23.24** - Animations
- **Recharts 3.5.0** - Data visualization
- **Lucide React 0.554.0** - Icons
- **i18next 25.6.3** - Internationalization

## 📱 Responsive Design

- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface

## 🎨 Design Features

- Government-style professional design
- Clean boxes with perfect alignments
- Smooth animations throughout
- Professional color scheme (Blue #0E61E7)
- High-quality images
- Consistent spacing and typography

## ⚙️ Configuration

### Port Configuration
Default port: `3000`

To change port, edit `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 3000 // Change this
  }
})
```

### Storage Keys

The app uses localStorage for session management:
- `attendsmart_user` - User data
- `attendsmart_userType` - User role (teacher/student/admin/government)

## 🐛 Troubleshooting

### If you encounter any issues:

1. **Clear node_modules and reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Clear browser cache**
   - Clear localStorage
   - Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

3. **Check Node version**
   ```bash
   node --version  # Should be 16+
   ```

## ✅ Build Status

- ✅ **No compilation errors**
- ✅ **No runtime errors**
- ✅ **All dependencies installed**
- ✅ **Production build successful**
- ✅ **All routes working**
- ✅ **All images loaded**
- ✅ **Animations working**

## 📝 Notes

- All statistics show `0` as this is a fresh installation
- Sample data is used for demonstration purposes
- Authentication is client-side only (add backend for production)
- Images are included in the project

## 🔄 Development Workflow

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

The built files in `dist/` folder can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 🆘 Support

If your friend encounters any issues:
1. Make sure Node.js is installed (version 16+)
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start the server
4. The project is guaranteed to work with zero errors

---

**Built with ❤️ for Government Schools in India**
