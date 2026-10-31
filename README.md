# NotifyHub — Notification Management System

A full-stack notification management platform built with **React, TypeScript, Vite and Django REST Framework**. NotifyHub allows administrators to manage notification triggers and templates while users receive personalized notifications through Email, WhatsApp and Web Push.

## Features

### Authentication and User Management
- User registration with username, email, password and WhatsApp number.
- Secure login and logout using Django token authentication.
- Separate Admin and User dashboards.
- Role-based access control.
- Automatic Login and Logout notification triggers.
- Persistent authentication across page refreshes.

### Admin Dashboard
- Overview of notification activity.
- Create, update and manage notification triggers.
- Trigger matrix for WhatsApp, Email and Web Push.
- Create and edit notification templates.
- Enable or disable individual notification channels.
- Test Email and WhatsApp templates.
- Manage browser push subscriptions.
- Test browser push notifications.

### User Dashboard
- Personalized user workspace.
- View registered email and WhatsApp details.
- Enable browser notification permissions.
- Register browser push subscriptions.
- View active browser subscriptions.
- Send test notifications to registered browsers.
- Logout and automatically trigger Logout notifications.

### Notification Channels

| Channel | Integration | Functionality |
|---|---|---|
| Email | Brevo API | Personalized email notifications |
| WhatsApp | Meta WhatsApp Cloud API | WhatsApp sandbox notifications |
| Web Push | Browser Push API + VAPID | Real-time browser notifications |

### Dynamic Notification Templates

Templates support dynamic variables using JSON variable mapping.

Example mapping:

```json
{
  "name": "user.name",
  "email": "user.email",
  "phone": "user.phone"
}
```

Example notification:

```text
Hello {{name}},

Welcome to NotifyHub!

Your registered email is {{email}}.
```

The backend renders the template using the authenticated user's information.

---

## Technology Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS 4 (if configured in the project)
- TanStack React Query
- Axios
- Lucide React
- Sonner

### Backend
- Python
- Django
- Django REST Framework
- PostgreSQL
- Token Authentication

### Notification Integrations
- Brevo Email API
- Meta WhatsApp Cloud API
- Web Push API
- PyWebPush
- VAPID Authentication

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: PostgreSQL

---

## Project Structure

```text
notification-system-frontend/
│
├── public/
│   └── sw.js
│
├── src/
│   ├── api/
│   │   └── client.ts
│   │
│   ├── components/
│   │   ├── AdminRoute.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── UI/
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── layouts/
│   │   └── AppLayout.tsx
│   │
│   ├── lib/
│   │   └── push.ts
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── UserDashboard.tsx
│   │   ├── Triggers.tsx
│   │   ├── Templates.tsx
│   │   ├── Testing.tsx
│   │   ├── Push.tsx
│   │   ├── Demo.tsx
│   │   └── Settings.tsx
│   │
│   ├── types/
│   ├── styles.css
│   └── main.tsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js and npm
- Python
- PostgreSQL
- Git

### 1. Clone the frontend repository

```bash
git clone https://github.com/YOUR_USERNAME/notification-system-frontend.git

cd notification-system-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the frontend root directory.

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### 4. Start the frontend

```bash
npm run dev
```

Frontend runs at:

http://localhost:5173

---

## Backend Setup

Clone the backend repository separately:

```bash
git clone https://github.com/YOUR_USERNAME/notification-system-django.git

cd notification-system-django
```

### 1. Create a virtual environment

```powershell
python -m venv venv

.\venv\Scripts\Activate.ps1
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure backend environment variables

Create a `.env` file using the backend `.env.example`.

Configure the following variables:

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

DATABASE_URL=your-postgresql-database-url

BREVO_API_KEY=your-brevo-api-key
BREVO_SENDER_EMAIL=your-verified-sender-email
BREVO_SENDER_NAME=NotifyHub

WHATSAPP_ACCESS_TOKEN=your-meta-access-token
WHATSAPP_PHONE_NUMBER_ID=your-whatsapp-phone-number-id
WHATSAPP_API_VERSION=v26.0

VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key
VAPID_CLAIMS_EMAIL=mailto:your-email@example.com
```

Never commit `.env` files or private API credentials.

### 4. Apply migrations

```bash
python manage.py migrate
```

### 5. Create an administrator

```bash
python manage.py createsuperuser
```

### 6. Start Django

```bash
python manage.py runserver
```

Backend runs at:

http://127.0.0.1:8000

Health check:

http://127.0.0.1:8000/api/health/

---

## API Endpoints

All API endpoints are prefixed with `/api/`.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register/` | Register a new user |
| POST | `/auth/login/` | Authenticate a user |
| POST | `/auth/logout/` | Logout and invalidate token |
| GET | `/auth/me/` | Get authenticated user details |

Registration request:

```json
{
  "username": "rahul",
  "email": "rahul@example.com",
  "password": "your-password",
  "whatsapp_phone": "+919876543210"
}
```

Login request:

```json
{
  "username": "rahul",
  "password": "your-password"
}
```

Authenticated requests use:

```http
Authorization: Token YOUR_AUTH_TOKEN
```

### Notification Triggers

| Method | Endpoint | Description |
|---|---|---|
| GET | `/triggers/` | List triggers |
| POST | `/triggers/` | Create trigger |
| PATCH | `/triggers/:id/` | Update trigger |
| DELETE | `/triggers/:id/` | Delete trigger |
| POST | `/triggers/:id/fire/` | Manually fire a trigger |

### Notification Templates

| Method | Endpoint | Description |
|---|---|---|
| GET | `/templates/` | List templates |
| POST | `/templates/` | Create template |
| PATCH | `/templates/:id/` | Update template |
| DELETE | `/templates/:id/` | Delete template |
| POST | `/templates/:id/test/` | Test Email or WhatsApp template |

### Web Push

| Method | Endpoint | Description |
|---|---|---|
| GET | `/web-push/public-key/` | Retrieve VAPID public key |
| GET | `/push-subscriptions/` | List accessible subscriptions |
| POST | `/push-subscriptions/` | Register or update browser subscription |
| POST | `/push-subscriptions/:id/test/` | Send test browser notification |

### Health Check

```http
GET /api/health/
```

---

## Authentication and Authorization

NotifyHub uses Django REST Framework Token Authentication.

- Normal users can register and log in.
- Administrators use Django superuser accounts.
- Admin APIs require administrator permissions.
- Normal users have access to their own browser subscriptions.
- Administrators can manage notification triggers and templates.
- Authentication tokens are stored in browser local storage and attached to protected API requests.

### Role-based dashboards

| User role | Dashboard |
|---|---|
| Administrator | Notification Management Dashboard |
| Normal User | Personal User Dashboard |

---

## Notification Workflow

### Login Notification

1. User submits login credentials.
2. Django authenticates the user.
3. The Login trigger is located.
4. Enabled notification templates are processed.
5. Email, WhatsApp and Web Push notifications are dispatched where configured.
6. Django returns the authentication token and notification results.

### Logout Notification

1. Authenticated user clicks Logout.
2. Django processes the Logout trigger.
3. Enabled notifications are dispatched.
4. Authentication token is invalidated.
5. User is redirected to the Login page.

**Important:** Web Push requires an existing browser subscription. Therefore, a user's first login may not produce a browser notification. The user must enable browser notifications after logging in.

---

## Browser Push Notifications

NotifyHub uses the browser Push API and VAPID authentication.

Workflow:

1. User logs into NotifyHub.
2. User clicks Enable Notifications.
3. Browser requests notification permission.
4. Frontend registers the service worker.
5. Frontend retrieves the VAPID public key.
6. Browser creates a push subscription.
7. Subscription endpoint and encryption keys are sent to Django.
8. Django associates the subscription with the authenticated user.
9. Django can send notifications to the registered browser.

Browser notifications require HTTPS or localhost.

---

## Important Configuration Notes

### WhatsApp Sandbox

The WhatsApp integration uses the Meta WhatsApp Cloud API test environment.

- The recipient must be added and verified in the Meta sandbox.
- Temporary access tokens can expire.
- A valid token and verified recipient are required for successful delivery.
- Sandbox configuration is intended for testing, not unrestricted production delivery.

### Email

The project uses Brevo for email delivery.

Configure the API key and verified sender email in the Django backend environment.

### CORS

For local development, configure Django CORS to allow the frontend development origin.

For production, restrict allowed origins to the actual deployed frontend domain.

Never use unrestricted CORS in production.

### Web Push Subscriptions

Browser endpoints are unique.

The backend uses an update-or-create operation so that an existing browser endpoint can be associated with the currently authenticated user rather than creating a duplicate record.

---

## Deployment

### Backend — Render

1. Push the Django backend to GitHub.
2. Create a Render Web Service.
3. Connect the backend GitHub repository.
4. Configure the Python build and start commands.
5. Configure PostgreSQL.
6. Add backend environment variables.
7. Configure `ALLOWED_HOSTS`, CORS and production security settings.
8. Deploy the backend.

Use your deployed Render API URL as the frontend API base URL.

### Frontend — Vercel

1. Push the React frontend to GitHub.
2. Import the frontend repository into Vercel.
3. Select Vite as the framework.
4. Configure the build command:

```bash
npm run build
```

5. Configure the output directory:

```text
dist
```

6. Add the environment variable:

```env
VITE_API_BASE_URL=https://YOUR-RENDER-BACKEND.onrender.com/api
```

7. Deploy the frontend.
8. Add the deployed Vercel origin to Django's production CORS configuration.

Make sure the Vercel deployment includes the SPA rewrite configuration in `vercel.json`.

---

## Testing Checklist

- [ ] Admin login
- [ ] Normal user registration
- [ ] Normal user login
- [ ] Role-based dashboard redirection
- [ ] Admin-only API authorization
- [ ] Trigger creation and editing
- [ ] Notification template creation and editing
- [ ] Enable and disable notification channels
- [ ] Email notification delivery
- [ ] WhatsApp sandbox notification delivery
- [ ] Browser notification permission
- [ ] Web Push subscription registration
- [ ] Web Push test notification
- [ ] Login notification delivery
- [ ] Logout notification delivery
- [ ] User-specific subscription isolation
- [ ] Production deployment testing

---

## Demo

The project demonstration should cover:

1. Administrator login.
2. Notification trigger management.
3. Notification template creation and editing.
4. Channel enable/disable functionality.
5. Normal user registration and login.
6. Browser notification subscription.
7. Login and Logout notification delivery.
8. Email, WhatsApp and Web Push notification testing.

---

## License

This project was developed as part of a Notification Management System assignment.

**NotifyHub — One platform. Three notification channels.**
