import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import UpdatesPage from './components/UpdatesPage'; // Renamed from PatchManager
import ServerManagementPage from './components/ServerManagementPage'; // Import the new page
import ScanningPage from './components/ScanningPage'; // Import the new ScanningPage
import AIInsights from './components/AIInsights';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import { FiUser, FiBell } from 'react-icons/fi';
import './index.css'; // Ensure Tailwind styles are imported

function App() {
  const [activePage, setActivePage] = useState('dashboard'); // For sidebar highlight
  const [currentPage, setCurrentPage] = useState('dashboard'); // For displayed content
  const [authPage, setAuthPage] = useState('login'); // 'login' or 'signup'
  const [user, setUser] = useState(null); // { email }
  const [token, setToken] = useState(null);

  // Login: store token and user
  const handleLogin = (jwtToken, email) => {
    setToken(jwtToken);
    setUser({ email });
  };
  // Signup: call login after signup
  const handleSignup = async (email, password) => {
    // After signup, log in
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) return;
      const data = await res.json();
      setToken(data.token);
      setUser({ email: data.email });
    } catch {}
  };
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setAuthPage('login');
    setCurrentPage('dashboard');
    setActivePage('dashboard');
  };

  // Show login/signup if not authenticated
  if (!token) {
    if (authPage === 'login') {
      return <Login onLogin={handleLogin} goToSignup={() => setAuthPage('signup')} />;
    } else {
      return <Signup onSignup={handleSignup} goToLogin={() => setAuthPage('login')} />;
    }
  }

  // Fetch user profile from backend for Profile page
  let CurrentPage;
  switch (currentPage) {
    case 'dashboard':
      CurrentPage = Dashboard;
      break;
    case 'updates':
      CurrentPage = UpdatesPage;
      break;
    case 'deployment':
      CurrentPage = UpdatesPage;
      break;
    case 'servers':
      CurrentPage = ServerManagementPage;
      break;
    case 'scanning':
      CurrentPage = ScanningPage;
      break;
    case 'ai-insights':
      CurrentPage = AIInsights;
      break;
    case 'profile':
      CurrentPage = () => <ProfileWithFetch token={token} onLogout={handleLogout} />;
      break;
    default:
      CurrentPage = Dashboard;
  }

  // Header with profile icon and notification bell
  const CustomHeader = () => (
    <div className="bg-white shadow p-4 flex justify-end items-center">
      <div className="flex items-center">
        <FiBell
          className="mr-4 text-xl text-gray-600 hover:text-gray-800 cursor-pointer"
          title="Notifications"
        />
        <FiUser
          className="text-xl text-gray-600 hover:text-gray-800 cursor-pointer"
          title="Profile"
          onClick={() => setCurrentPage('profile')}
        />
      </div>
    </div>
  );

  // Profile page with fetch
  function ProfileWithFetch({ token, onLogout }) {
    const [profile, setProfile] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    React.useEffect(() => {
      setLoading(true);
      setError('');
      fetch('http://localhost:4000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch profile');
          return res.json();
        })
        .then(data => {
          setProfile(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load profile');
          setLoading(false);
        });
    }, [token]);
    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;
    return <Profile user={profile} onLogout={onLogout} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} onNavigate={pageId => {
        setCurrentPage(pageId);
        if (pageId !== 'scanning') setActivePage(pageId);
      }} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <CustomHeader />
        <CurrentPage />
      </div>
    </div>
  );
}

export default App; 