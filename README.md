# NotifyHub – Frontend

NotifyHub is a web-based Notification Management System dashboard built using **React, TypeScript and Vite**.

It provides an interface for administrators to manage notification triggers, configure templates, test notification delivery and monitor Web Push subscriptions. Normal users can register, log in and receive notifications.

## 1. Live Application

**Frontend URL:**  
https://notification-system-frontend-three.vercel.app/

**Login Page:**  
https://notification-system-frontend-three.vercel.app/login

**Backend API:**  
https://notification-system-api-xjqq.onrender.com/api

**GitHub Repository:**  
https://github.com/biswajeet787/notification-system-frontend

## 2. Application Access Instructions

### Administrator Access

1. Open the live application:

   https://notification-system-frontend-three.vercel.app/login

2. Enter your production administrator username.
3. Enter your administrator password.
4. Click Sign In.

After successful authentication, administrators can access:

- Overview
- Trigger Matrix
- Templates
- Test Center
- Web Push
- Login / Logout Demo
- Configuration

**Important:** Administrator credentials must be created in the production backend database. Local administrator credentials do not automatically work in production.

### Normal User Access

1. Open the live application.
2. Navigate to the Register page.
3. Enter the required registration details.
4. Provide your WhatsApp phone number if requested.
5. Complete registration.
6. Log in using your account.

Normal users can access their dashboard, manage their browser push subscription and receive configured notifications.

### Enable Browser Notifications

To receive Web Push notifications:

1. Log in using a normal user account.
2. Open the User Dashboard.
3. Click the Web Push subscription button.
4. Allow notifications in your browser.
5. Confirm that the subscription is registered successfully.

Web Push requires HTTPS in production and browser notification permission.

## 3. Project Setup Instructions

### Prerequisites

Install:

- Node.js (LTS recommended).
- npm.
- Git.
- Visual Studio Code (recommended).

### Step 1: Clone the repository

```bash
git clone https://github.com/biswajeet787/notification-system-frontend.git
```

Navigate into the project:

```bash
cd notification-system-frontend
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure environment variables

Create a `.env` file in the frontend project root directory.

Add:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

This connects the frontend to the locally running Django backend.

For production, the API URL is configured through Vercel environment variables:

```env
VITE_API_BASE_URL=https://notification-system-api-xjqq.onrender.com/api
```

**Important:** Vite exposes variables prefixed with `VITE_` to the browser. Only public configuration values, such as the API URL, should use this prefix. Never put passwords, API keys or database credentials in frontend environment variables.

### Step 4: Start the development server

```bash
npm run dev
```

The frontend will run at:

http://localhost:5173/

Make sure the Django backend is also running locally.

### Step 5: Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 4. Features

### Authentication

- User registration.
- User login and logout.
- Token-based authentication.
- Protected application routes.
- Role-based access for administrators and normal users.
- Persistent authentication using browser local storage.

### Administrator Dashboard

- Overview of notification management.
- Trigger management.
- Notification template management.
- Template testing.
- Web Push subscription management.
- Login and Logout demonstration.
- Configuration interface.

### Trigger Management

Administrators can:

- View notification triggers.
- Create triggers.
- Edit trigger details.
- Enable or disable triggers.
- Manage the associated notification channels.

### Notification Templates

Administrators can:

- Create notification templates.
- Edit existing templates.
- Configure notification content.
- Configure template variable mapping.
- Enable or disable individual channel templates.
- Test supported notification channels.

### Notification Channels

**Email**
- Email template management.
- Test email notifications.
- Dynamic email content.

**WhatsApp**
- WhatsApp template management.
- Test WhatsApp notifications.
- Integration with WhatsApp Cloud API.

**Web Push**
- Browser subscription management.
- Enable browser notifications.
- Test registered subscriptions.
- Receive browser notifications.

### Normal User Dashboard

- User profile information.
- Email notification status.
- WhatsApp notification information.
- Web Push subscription.
- Browser subscription status.
- Push notification testing.
- Logout functionality.

## 5. Application Pages

| Page | Purpose |
|---|---|
| Login | User authentication |
| Register | New user registration |
| Overview | Administrator dashboard |
| Trigger Matrix | Manage notification triggers |
| Templates | Manage notification templates |
| Test Center | Test supported notification templates |
| Web Push | Manage browser subscriptions |
| Login / Logout Demo | Demonstrate authentication triggers |
| Configuration | Application configuration |
| User Dashboard | Normal user notification dashboard |

## 6. Frontend Architecture

The project uses a feature-oriented React structure.

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
│   │   ├── ProtectedRoute.tsx
│   │   └── AdminRoute.tsx
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
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── UserDashboard.tsx
│   │   ├── Triggers.tsx
│   │   ├── Templates.tsx
│   │   ├── Testing.tsx
│   │   ├── Push.tsx
│   │   ├── Demo.tsx
│   │   └── Settings.tsx
│   │
│   ├── types/
│   │
│   ├── main.tsx
│   └── styles.css
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.ts
```

The tree shows the main project structure; additional files may exist.

## 7. API Integration

The frontend communicates with the Django REST API using Axios.

The API client provides:

- Centralized API configuration.
- Authentication token handling.
- Request and response handling.
- Error handling.
- Trigger API integration.
- Template API integration.
- Push subscription API integration.

The authentication token is attached to protected requests using:

```http
Authorization: Token YOUR_AUTH_TOKEN
```

The API base URL is controlled by:

```env
VITE_API_BASE_URL
```

## 8. Web Push Implementation

The frontend uses the browser Push API and Service Workers.

The subscription workflow:

1. Request browser notification permission.
2. Register the service worker.
3. Fetch the VAPID public key from the backend.
4. Create a browser push subscription.
5. Send subscription details to the Django backend.
6. Store the subscription for notification delivery.

Web Push requires a secure context (HTTPS or localhost).

## 9. Production Deployment

The frontend is deployed using Vercel.

**Hosting:** Vercel  
**Framework:** React + Vite  
**Build Command:** `npm run build`  
**Output Directory:** `dist`

### Vercel Environment Variables

Configure:

```env
VITE_API_BASE_URL=https://notification-system-api-xjqq.onrender.com/api
```

Select Production and Preview environments as required.

### Deployment Steps

1. Push the frontend code to GitHub.
2. Open Vercel.
3. Import the GitHub repository.
4. Select Vite as the framework.
5. Configure the environment variable.
6. Deploy the project.
7. Verify that the frontend can communicate with the Render backend.

### Backend CORS Configuration

The Django backend must allow the deployed frontend origin.

Configure the following in Render:

```env
CORS_ALLOWED_ORIGINS=https://notification-system-frontend-three.vercel.app
```

For local and production development together:

```env
CORS_ALLOWED_ORIGINS=http://localhost:5173,https://notification-system-frontend-three.vercel.app
```

## 10. Technology Stack

| Technology | Purpose |
|---|---|
| React | UI development |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Axios | API communication |
| React Router | Application routing |
| HTML / CSS | User interface |
| Browser Push API | Web Push subscriptions |
| Service Workers | Background push handling |
| Vercel | Frontend hosting |

## 11. Important Notes

- The backend must be running for API-dependent features to work.
- Production and local databases are separate.
- Admin and normal users have different permissions.
- Web Push requires browser permission and a registered subscription.
- WhatsApp sandbox delivery requires an eligible verified recipient.
- Never commit `.env` files or secret credentials to GitHub.
- Only public configuration values should be exposed through Vite environment variables.

## 12. Author

Developed as part of the NotifyHub Notification Management System project.

**Frontend Repository:** https://github.com/biswajeet787/notification-system-frontend

**Live Application:** https://notification-system-frontend-three.vercel.app/