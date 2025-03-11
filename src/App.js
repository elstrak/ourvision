import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import HomePage from './pages/HomePage/HomePage';
import TrendsPage from './pages/TrendsPage/TrendsPage';
import ContactPage from './pages/ContactPage/ContactPage';
import BriefPage from './pages/BriefPage/BriefPage';
import CareerPage from './pages/CareerPage/CareerPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage/ProjectDetailPage';
import CustomCursor from './components/CustomCursor/CustomCursor';
import './App.css';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminStats from './admin/pages/AdminStats';
import AdminProjects from './admin/pages/AdminProjects';
import AuthState from './admin/context/auth/AuthState';
import AdminJobs from './admin/pages/AdminJobs';
import AdminTrends from './admin/pages/AdminTrends';
import TrendDetailPage from './pages/TrendDetailPage/TrendDetailPage';
import AdminBriefs from './admin/pages/AdminBriefs';
import AdminTestimonials from './admin/pages/AdminTestimonials';
import AboutPage from './pages/AboutPage/AboutPage';
import TrendEdit from './admin/components/trends/TrendEdit';
import AdminTeam from './admin/pages/AdminTeam';

function App() {
  return (
    <AuthState>
      <CustomCursor />
      <Router>
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<HomePage />} />
          <Route path="/trends" element={<TrendsPage />} />
          <Route path="/trends/:id" element={<TrendDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/brief" element={<BriefPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Маршруты админ-панели */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/stats" element={<AdminStats />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/trends" element={<AdminTrends />} />
          <Route path="/admin/briefs" element={<AdminBriefs />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/trends/new" element={<TrendEdit />} />
          <Route path="/admin/trends/edit/:id" element={<TrendEdit />} />
          <Route path="/admin/team" element={<AdminTeam />} />
          {/* Маршрут 404 */}
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
      </Router>
    </AuthState>
  );
}

export default App;
