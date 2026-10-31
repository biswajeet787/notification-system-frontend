
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  BellRing,
  Bell,
  ShieldCheck,
  Mail,
  MessageCircle,
  Smartphone,
  LogOut,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  User,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { api, apiError } from '../api/client';
import { subscribeToPush } from '../lib/push';
import type { Subscription } from '../types';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>(
    'default'
  );

  async function loadSubscriptions() {
    try {
      const data = await api.subscriptions();
      setSubscriptions(data);
    } catch (error) {
      toast.error(apiError(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    loadSubscriptions();
  }, []);

  const activeSubscriptions = subscriptions.filter(
    (subscription) => subscription.is_active
  );

  async function handleSubscribe() {
    setBusy(true);

    try {
      await subscribeToPush();
      setPermission(Notification.permission);
      await loadSubscriptions();

      toast.success('Browser notifications enabled successfully!');
    } catch (error) {
      toast.error(apiError(error));
    } finally {
      setBusy(false);
    }
  }

  async function handleTestPush(id: number) {
    setBusy(true);

    try {
      await api.testPush(id);
      toast.success('Test notification sent to your browser!');
    } catch (error) {
      toast.error(apiError(error));
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);

    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error(apiError(error));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="user-dashboard">

      <header className="user-topbar">
        <div className="user-brand">
          <div className="user-brand-icon">
            <BellRing size={22} />
          </div>
          <div>
            <strong>NotifyHub</strong>
            <small>USER WORKSPACE</small>
          </div>
        </div>

        <button
          className="user-logout"
          onClick={handleLogout}
          disabled={busy}
        >
          <LogOut size={17} />
          Logout
        </button>
      </header>

      <main className="user-main">

        <section className="user-welcome">
          <div>
            <span className="user-eyebrow">YOUR PERSONAL WORKSPACE</span>
            <h1>Hello, {user?.username || 'User'}! 👋</h1>
            <p>
              Manage your notification preferences and stay updated
              across your connected channels.
            </p>
          </div>

          <div className="user-welcome-icon">
            <BellRing size={45} />
          </div>
        </section>

        <section className="user-stats">

          <div className="user-stat-card">
            <div className="user-stat-icon purple">
              <Bell size={21} />
            </div>
            <div>
              <strong>{activeSubscriptions.length}</strong>
              <span>Active browser subscriptions</span>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-icon green">
              <ShieldCheck size={21} />
            </div>
            <div>
              <strong>
                {permission === 'granted' ? 'Enabled' : 'Not enabled'}
              </strong>
              <span>Browser notification permission</span>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-icon blue">
              <User size={21} />
            </div>
            <div>
              <strong>Active</strong>
              <span>Account status</span>
            </div>
          </div>

        </section>

        <section className="user-section-heading">
          <div>
            <h2>Notification channels</h2>
            <p>Manage how you receive notifications.</p>
          </div>
        </section>

        <section className="user-channel-grid">

          <div className="user-channel-card">
            <div className="user-channel-top">
              <div className="user-channel-icon whatsapp">
                <MessageCircle size={23} />
              </div>
              <span className="user-channel-badge">Configured</span>
            </div>

            <h3>WhatsApp</h3>
            <p>Receive important updates on your WhatsApp number.</p>

            <div className="user-channel-detail">
              {user?.whatsapp_phone || 'No number configured'}
            </div>
          </div>

          <div className="user-channel-card">
            <div className="user-channel-top">
              <div className="user-channel-icon email">
                <Mail size={23} />
              </div>
              <span className="user-channel-badge">Configured</span>
            </div>

            <h3>Email</h3>
            <p>Receive notification updates directly in your inbox.</p>

            <div className="user-channel-detail">
              {user?.email || 'No email configured'}
            </div>
          </div>

          <div className="user-channel-card">
            <div className="user-channel-top">
              <div className="user-channel-icon webpush">
                <Smartphone size={23} />
              </div>

              <span className={`user-channel-badge ${
                activeSubscriptions.length ? 'enabled' : 'disabled'
              }`}>
                {activeSubscriptions.length ? 'Enabled' : 'Not enabled'}
              </span>
            </div>

            <h3>Web Push</h3>
            <p>
              Receive instant browser notifications even when
              the dashboard is not open.
            </p>

            <div className="user-channel-detail">
              {activeSubscriptions.length} active subscription(s)
            </div>
          </div>

        </section>

        <section className="user-push-panel">
          <div className="user-push-content">
            <div className="user-push-icon">
              <BellRing size={27} />
            </div>

            <div>
              <span className="user-eyebrow">BROWSER NOTIFICATIONS</span>
              <h2>Enable Web Push Notifications</h2>
              <p>
                Allow NotifyHub to send notifications directly
                to this browser.
              </p>
            </div>
          </div>

          <div className="user-push-actions">

            {permission === 'denied' ? (
              <div className="user-permission-warning">
                <AlertCircle size={17} />
                Notifications are blocked in your browser settings.
              </div>
            ) : (
              <button
                className="user-primary-button"
                onClick={handleSubscribe}
                disabled={busy}
              >
                <Bell size={18} />
                {busy ? 'Please wait...' : 'Enable Notifications'}
              </button>
            )}

            <p>
              Browser permission: <strong>{permission}</strong>
            </p>
          </div>
        </section>

        <section className="user-section-heading">
          <div>
            <h2>My browser subscriptions</h2>
            <p>Browsers connected to your account.</p>
          </div>

          <button
            className="user-refresh-button"
            onClick={loadSubscriptions}
            disabled={loading}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </section>

        <section className="user-subscriptions">

          {loading ? (
            <p className="user-empty">Loading subscriptions...</p>
          ) : activeSubscriptions.length === 0 ? (
            <div className="user-empty">
              <BellRing size={30} />
              <strong>No browser subscriptions yet</strong>
              <span>Enable Web Push above to register this browser.</span>
            </div>
          ) : (
            activeSubscriptions.map((subscription) => (
              <div className="user-subscription-row" key={subscription.id}>
                <div className="user-subscription-info">
                  <div className="user-subscription-icon">
                    <Smartphone size={20} />
                  </div>

                  <div>
                    <strong>Browser subscription #{subscription.id}</strong>
                    <span>
                      <CheckCircle2 size={13} />
                      Active
                    </span>
                  </div>
                </div>

                <button
                  className="user-test-button"
                  onClick={() => handleTestPush(subscription.id)}
                  disabled={busy}
                >
                  <Send size={15} />
                  Test notification
                </button>
              </div>
            ))
          )}

        </section>

        <footer className="user-footer">
          <ShieldCheck size={16} />
          Your notification preferences are managed securely by NotifyHub.
        </footer>

      </main>
    </div>
  );
}
