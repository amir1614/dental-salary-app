# dental.fyi - Dentist Salary Comparison Platform

A comprehensive React-based web application for comparing dentist salaries across different locations and specialties, inspired by platforms like levels.fyi. Built by a high school student passionate about dental technology and transparency in healthcare compensation.

## 🌟 Features

### **🏠 Home Page**
- **BLS Data Integration**: Official Bureau of Labor Statistics salary data
- **Community Submissions**: Real user-contributed salary information
- **Advanced Search**: Filter by location, position, or company
- **Responsive Design**: Works perfectly on all devices

### **📊 BLS Data Explorer**
- **Official Statistics**: Bureau of Labor Statistics data for General Dentists
- **Interactive Table**: Sortable columns and filtering capabilities
- **Geographic Comparison**: Salary data across different states
- **Percentile Distributions**: Comprehensive salary insights

### **📝 Salary Submission**
- **User-Friendly Form**: Easy submission process for dentists
- **Comprehensive Data**: Position, location, salary, benefits, experience
- **Real-time Updates**: Submissions appear immediately on the platform
- **Privacy-First**: Anonymous submissions with no personal data

### **🔐 Admin Panel**
- **Content Moderation**: Review and delete inappropriate submissions
- **Secure Authentication**: Protected admin access
- **Real-time Management**: Immediate updates to the platform

### **📄 About & Contact**
- **Project Story**: Learn about the creator's vision
- **Direct Contact**: Easy communication with the developer
- **FAQ Section**: Common questions answered

## 🛠️ Technology Stack

### **Frontend**
- **React 18** with TypeScript
- **Bootstrap 5** for responsive design
- **Bootstrap Icons** for visual elements
- **Local Storage** for session management

### **Backend**
- **Node.js** with Express.js
- **SQLite** database for data persistence
- **RESTful API** with proper error handling
- **JWT-like Authentication** for admin access

### **Data Sources**
- **Bureau of Labor Statistics (BLS)** official data
- **Community Submissions** from dental professionals
- **Real-time Updates** through API integration

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/dental-salary-app.git
cd dental-salary-app
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Start the backend server**
```bash
npm run dev
# or
node server.js
```

5. **Start the frontend development server**
```bash
# In a new terminal, from the root directory
npm start
```

6. **Open your browser**
Navigate to `http://localhost:3000` to view the application.

## 📁 Project Structure

```
dental-salary-app/
├── public/
│   └── index.html              # Main HTML template
├── src/
│   ├── components/
│   │   ├── SalaryExplorer.tsx      # BLS data display
│   │   ├── SalarySubmission.tsx    # Salary submission form
│   │   ├── About.tsx               # About page
│   │   ├── Contact.tsx             # Contact page
│   │   ├── AdminLogin.tsx          # Admin authentication
│   │   └── AdminDashboard.tsx      # Admin management
│   ├── data/
│   │   └── bls_dentists.json       # BLS salary data
│   ├── App.tsx                     # Main application
│   ├── App.css                     # Custom styles
│   └── index.tsx                   # Application entry
├── backend/
│   ├── server.js                   # Express server
│   ├── package.json                # Backend dependencies
│   └── README.md                   # Backend documentation
└── README.md                       # This file
```

## 🔧 Configuration

### **Default Admin Credentials**
- **Username**: `admin`
- **Password**: `admin123`

**⚠️ Important**: Change these credentials before deploying to production!

### **Environment Variables**
The application uses default configurations for development. For production, consider:
- Database path configuration
- Admin credentials
- API endpoints
- CORS settings

## 🌐 Deployment

### **Frontend (GitHub Pages)**
1. Build the production version:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### **Backend (Heroku/Vercel)**
1. Set up environment variables
2. Deploy the backend directory
3. Update frontend API endpoints

## 📊 API Endpoints

### **Public Endpoints**
- `GET /api/submissions` - Get all community submissions
- `POST /api/submissions` - Submit new salary data
- `GET /api/health` - Health check

### **Admin Endpoints**
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/submissions` - Get all submissions (admin)
- `DELETE /api/admin/submissions/:id` - Delete submission (admin)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Creator

**Amir** - A high school student passionate about dental technology and healthcare innovation. This project was born from the observation that dental professionals lacked the salary transparency that other industries enjoy through platforms like levels.fyi.

### **Contact**
- **Email**: amir.musa.ali09@gmail.com
- **GitHub**: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- **Bureau of Labor Statistics** for official salary data
- **Bootstrap** for the responsive design framework
- **React** community for the amazing frontend framework
- **Dental professionals** who contribute to salary transparency

---

**Built with ❤️ for the dental community**

*Transparency in compensation leads to better career decisions, fairer pay, and a more informed dental workforce.*
