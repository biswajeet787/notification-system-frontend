
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BellRing,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  MessageSquare,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { apiError } from '../api/client';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const loggedInUser = await login(username, password);
      navigate(loggedInUser.is_staff ? '/' : '/user-dashboard');
    } catch (err) {
      setError(apiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-container">

        <section className="auth-brand-panel">
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <BellRing size={25} />
            </div>
            <span>NotifyHub</span>
          </div>

          <div className="auth-brand-content">
            <div className="auth-tag">
              <span className="auth-tag-dot" />
              SMART NOTIFICATION PLATFORM
            </div>

            <h1>
              Every message.
              <br />
              <span>Right on time.</span>
            </h1>

            <p>
              Manage and deliver notifications across WhatsApp,
              Email and Web Push from one powerful platform.
            </p>

            <div className="auth-feature-list">
              <div>
                <span className="auth-feature-icon"><MessageSquare size={19} /></span>
                <span>
                  <strong>Multi-channel delivery</strong>
                  <small>Reach users through their preferred channels.</small>
                </span>
              </div>

              <div>
                <span className="auth-feature-icon"><Zap size={19} /></span>
                <span>
                  <strong>Real-time notifications</strong>
                  <small>Deliver important updates instantly.</small>
                </span>
              </div>

              <div>
                <span className="auth-feature-icon"><ShieldCheck size={19} /></span>
                <span>
                  <strong>Secure management</strong>
                  <small>Keep your notification workflow organized.</small>
                </span>
              </div>
            </div>
          </div>

          <div className="auth-brand-footer">
            © 2026 NotifyHub. All rights reserved.
          </div>

          <div className="auth-decoration auth-decoration-one" />
          <div className="auth-decoration auth-decoration-two" />
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-wrapper">

            <div className="auth-mobile-brand">
              <div className="auth-brand-icon">
                <BellRing size={23} />
              </div>
              <strong>NotifyHub</strong>
            </div>

            <div className="auth-form-heading">
              <span className="auth-eyebrow">WELCOME BACK</span>
              <h2>Sign in to your account</h2>
              <p>Enter your credentials to access your workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">

              <div className="auth-field">
                <label htmlFor="username">Username</label>
                <div className="auth-input-wrap">
                  <Mail size={19} />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="password">Password</label>
                <div className="auth-input-wrap">
                  <Lock size={19} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="auth-submit"
                disabled={submitting}
              >
                {submitting ? 'Signing in...' : 'Sign in to NotifyHub'}
                {!submitting && <ArrowRight size={19} />}
              </button>
            </form>

            <div className="auth-divider">
              <span>NEW TO NOTIFYHUB?</span>
            </div>

            <p className="auth-switch">
              Don't have an account?
              <Link to="/register"> Create an account</Link>
            </p>

            <div className="auth-security-note">
              <ShieldCheck size={17} />
              Your account is protected with secure authentication.
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
