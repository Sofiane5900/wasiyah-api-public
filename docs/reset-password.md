# Reset Password — API Workflow

## Overview
This document describes the public API workflow for the password reset feature. It intentionally omits internal implementation details (services, storage, hashing, email provider).
Audience: front-end developers and API consumers who need to integrate the password reset flow.

## Quick facts
- Base path: `api/v1/reset-password`
- Primary flow: request → validate token → submit new password
- Example reset link sent by email (development): `http://localhost:3000/{token}`
- Controller responses (messages & status codes) are used as-is in examples below.

## Workflow (high-level)
1. Request — User submits their email to request a password reset.
   - PI always responds with 201 Created to avoid disclosing whether the email exists.
   - If the email exists, a reset link containing a unique token is sent to that address.

2. Validate token — Client (or link click) supplies the token to verify it is valid and not expired.
   - If valid, API returns 200 OK; the client may show a password reset form.

3. Update password — Client submits the new password together with the token.
   - API validates the token again and, on success, updates the password and returns 200 OK.

## Endpoints
### 1) Request password reset
- URL: `POST api/v1/reset-password/request`
- Purpose: Start the reset process by submitting user email. 
- Request body (JSON):
```json
{
  "email": "user@example.com"
}
```
- Validation: Request email is validated for proper email format. If invalid, the API returns 422 Unprocessable Entity with message "Email is not valid".
- Success response: 201 Created
```json
{
  "message": "Reset password request received"
}
```
- Behaviour note: For security the endpoint always returns 201 Created (no enumeration). If the email exists, an email with a reset URL `http://localhost:3000/{token}` is sent.

### 2) Validate token
- URL: `GET api/v1/reset-password/validate/:param`
- Purpose: Verify the reset token supplied in the URL path is valid and not expired.
- Path parameter: param — the reset token from the email link.
- Success response: 200 OK
```json
{
  "message": "Reset password token validated"
}
```
- Failure responses: If the token is invalid or expired, the API returns an error (implementation-dependent; typical responses are 400 or 404) with a descriptive message such as "Invalid or expired token".

### 3) Update (reset) password
- URL: `PATCH api/v1/reset-password/reset`
- Purpose: Apply the new password for the user identified by the provided token.
- Request body (JSON):
```json
{
  "param": "unique-reset-token",
  "plainPassword": "NewSecurePassword123"
}
```
- Success response: 200 OK
```json
{
  "message": "Password updated with success"
}
```
- Failure responses: If the token is invalid/expired or the password does not meet policy requirements, the API returns an error (4xx) with an explanatory message. Exact error codes/messages depend on the server-side implementation.

## Known status codes & messages (from controller)
- `201 Created` — request endpoint
- `200 OK` — validate endpoint
- `200 OK` — reset endpoint
- `422 Unprocessable Entity` — if submitted email is malformed or non-complex password
- `404 Not Found` — Returned when the provided reset token does not exist in the system or has already been used.
- `401 Unauthorized` — Returned when the provided reset token is invalid or has expired, and the request cannot be authorized.
