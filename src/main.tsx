
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';

import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Triggers from './pages/Triggers';
import Templates from './pages/Templates';
import Testing from './pages/Testing';
import Push from './pages/Push';
import Demo from './pages/Demo';
import Settings from './pages/Settings';

import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 15000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Normal user dashboard */}
            <Route element={<ProtectedRoute />}>
              <Route path="/user-dashboard" element={<UserDashboard />} />
            </Route>

            {/* Admin dashboard */}
            <Route element={<AdminRoute />}>
              <Route element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="triggers" element={<Triggers />} />
                <Route path="templates" element={<Templates />} />
                <Route path="testing" element={<Testing />} />
                <Route path="push" element={<Push />} />
                <Route path="demo" element={<Demo />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>

          <Toaster richColors position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
