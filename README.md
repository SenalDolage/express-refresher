## express-refresher

Minimal Express.js example demonstrating EJS views, JWT authentication (access + refresh tokens), and organized routes/middleware.

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Add environment variables (see [.env](.env)):
- TOKEN_SECRET
- RE_TOKEN_KEY

3. Run in development

```bash
npm run start
```

- `app.js` is the primary API server file. See [app.js](app.js).
- `server.js` contains the example EJS-driven server and [`server.logger`](server.js).

## Available Routes

Note: the project exposes both an API server (`app.js`) and an example view server (`server.js`).

Views / Example pages (from [server.js](server.js)):
- GET / -> renders [views/index.ejs](views/index.ejs) (uses `locals.text`) via `server.logger`.

User management (views) (from [routes/users.js](routes/users.js)):
- GET /users/all -> "All users"
- GET /users/new -> renders [views/users/new.ejs](views/users/new.ejs)
- POST /users -> create user (in-memory) — see [`routes.users (router)`](routes/users.js)
- GET /users/:id -> show user

API (from [app.js](app.js) and [routes/user.js](routes/user.js)):
- POST /api/user/login -> accept JSON { "username": "..." } and returns `{ accessToken, refreshToken }` (see [`routes.user.login`](routes/user.js))
- POST /api/user/token -> accepts `{ refreshToken }`, returns new access token (see [`routes.user.token`](routes/user.js))
- DELETE /api/user/logout -> accepts `{ refreshToken }` to invalidate a refresh token (see [`routes.user.logout`](routes/user.js))

Protected API:
- GET /api/student -> protected by [`middleware.auth`](middleware/auth.js); returns `req.user` (see [routes/student.js](routes/student.js))

## JWT Behavior

- Access tokens are signed with `process.env.TOKEN_SECRET` and short-lived (`15s` in example).
- Refresh tokens are signed with `process.env.RE_TOKEN_KEY` and longer-lived (`24h` in example). Refresh tokens are stored in-memory in [routes/user.js](routes/user.js).

## Example curl flows

Login (get tokens):
```bash
curl -X POST http://localhost:3000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice"}'
```

Use access token (protected route):
```bash
curl -H "Authorization: bearer <accessToken>" http://localhost:3000/api/student
```

Refresh access token:
```bash
curl -X POST http://localhost:3000/api/user/token \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refreshToken>"}'
```

Logout (invalidate refresh token):
```bash
curl -X DELETE http://localhost:3000/api/user/logout \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refreshToken>"}'
```

## Notes

- This project stores users and refresh tokens in memory (development/demo only). See [routes/users.js](routes/users.js) and [routes/user.js](routes/user.js).
- The auth middleware is implemented in [middleware/auth.js](middleware/auth.js) and expects `Authorization: bearer <token>`.
- Views use EJS templates located under [views/](views/).

## License

Unlicensed (example project).
