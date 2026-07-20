# Banking Platform Web

Frontend for the Store Bank banking platform. This Angular 19 application provides the user, operator, account, beneficiary, authentication, and transaction flows for the platform.

## What is included

- Authentication and new user registration.
- User management pages for listing, editing, and viewing user details.
- Account screens for listing a user's accounts and balances.
- Beneficiary screens for listing, editing, and viewing beneficiaries.
- Operator screens for accounts and transactions.
- Transaction actions backed by the API at `http://localhost:8080/api/v1`.

## Prerequisites

- Node.js 18+.
- npm.
- The API service available at `http://localhost:8080/api/v1`.

## Run locally

1. Make sure the API service is running and reachable at `http://localhost:8080/api/v1`.
2. Start the frontend in this folder:

```bash
npm install
npm start
```

3. Open `http://localhost:4200/` in your browser.

## Available scripts

| Script | Description |
|--------|-------------|
| `npm start` | Starts the Angular development server. |
| `npm run build` | Builds the application for production. |
| `npm run watch` | Builds continuously in development mode. |
| `npm test` | Runs unit tests with Karma. |

## Application routes

| Route | Purpose |
|-------|---------|
| `/auth/login` | Login page. |
| `/auth/new-user` | User registration page. |
| `/user/list` | User list. |
| `/user/edit/:id` | Edit an existing user. |
| `/user/details` | Current user details. |
| `/account/list/:userId` | Accounts for a user. |
| `/beneficiaries/list` | Beneficiary list. |
| `/beneficiaries/edit/:id` | Edit a beneficiary. |
| `/beneficiaries/:id` | Beneficiary detail view. |
| `/operator/accounts` | Operator account overview. |
| `/operator/transactions` | Operator transaction management. |

## Project structure

- `src/app/auth` authentication pages.
- `src/app/user` user management.
- `src/app/account` account views and transfer forms.
- `src/app/beneficiary` beneficiary screens.
- `src/app/operator` operator screens.
- `src/app/service` HTTP services for the backend API.
- `src/app/models` domain models and DTOs.

## Notes

- The app currently uses a fixed backend base URL in the Angular services.
- If you change the backend port or host, update the service base URL accordingly.
