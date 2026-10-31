
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BellRing,
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { apiError } from '../api/client';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const registeredUser = await register(
        username,
        email,
        password,
        whatsappPhone
      );

      navigate(
        registeredUser.is_staff ? '/' : '/user-dashboard'
      );
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
              JOIN NOTIFYHUB
            </div>

            <h1>
              Stay connected.
              <br />
              <span>Never miss out.</span>
            </h1>

            <p>
              Create your account and experience a smarter
              way to receive important updates and notifications.
            </p>

            <div className="auth-register-benefits">
              <div>
                <span className="auth-benefit-number">01</span>
                <span>
                  <strong>Simple registration</strong>
                  <small>Create your account in just a few steps.</small>
                </span>
              </div>

              <div>
                <span className="auth-benefit-number">02</span>
                <span>
                  <strong>Multiple notification channels</strong>
                  <small>Email, WhatsApp and browser notifications.</small>
                </span>
              </div>

              <div>
                <span className="auth-benefit-number">03</span>
                <span>
                  <strong>Your own workspace</strong>
                  <small>Manage your notification preferences.</small>
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
              <span className="auth-eyebrow">GET STARTED</span>
              <h2>Create your account</h2>
              <p>Fill in your details to get started with NotifyHub.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">

              <div className="auth-field">
                <label htmlFor="username">Username</label>
                <div className="auth-input-wrap">
                  <User size={19} />
                  <input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="email">Email address</label>
                <div className="auth-input-wrap">
                  <Mail size={19} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="phone">WhatsApp number</label>
                <div className="auth-input-wrap">
                  <Phone size={19} />
                  <input
                    id="phone"
                    type="tel"
                    value={whatsappPhone}
                    onChange={(e) => setWhatsappPhone(e.target.value)}
                    placeholder="+91XXXXXXXXXX"
                    autoComplete="tel"
                    required
                  />
                </div>
                <small className="auth-field-hint">
                  Include your country code, for example +91.
                </small>
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
                    placeholder="Create a password"
                    autoComplete="new-password"
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
                {submitting ? 'Creating account...' : 'Create account'}
                {!submitting && <ArrowRight size={19} />}
              </button>
            </form>

            <div className="auth-divider">
              <span>ALREADY REGISTERED?</span>
            </div>

            <p className="auth-switch">
              Already have an account?
              <Link to="/login"> Sign in</Link>
            </p>

            <div className="auth-security-note">
              <ShieldCheck size={17} />
              Your information is securely stored.
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
