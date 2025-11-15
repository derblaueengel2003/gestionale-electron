# Gestionale m2Square

Gestionale m2Square is an Electron desktop application backed by React, Redux, and Firebase. It is designed for real-estate teams that need to manage the entire sales pipeline (leads, deals, properties, contacts, invoices, documents, newsletters, and evaluations) from a single bilingual (IT/DE) workspace that can also synchronize listing data with the public WordPress site.

---

## Highlights
- **All-in-one CRM** – keep deals, contacts, objects, invoices, leads, newsletters, and evaluations in dedicated dashboards (see `src/components/**` and `src/routers/AppRouter.js`).
- **Firebase-backed data model** – every section is persisted in Firebase Realtime Database through a shared `storeSection` abstraction (`src/store/storeSection.js`), which generates CRUD actions/reducers for each collection.
- **WordPress integration** – property payloads are pushed up to the public site through JWT-authenticated REST calls (`src/components/m2SquareAPI/**`). Image management and translation flows are built in.
- **Electron shell features** – the main process (`index.js`) exposes IPC handlers to open synced OneDrive folders, launch external links, and proxy API calls (e.g., Immobilienscout24) so that the renderer can work around CORS.
- **Document builder & templates** – pre-filled legal modules (MAA, VWB, Vollmacht, DSGVO, etc.) live under `src/components/moduli`, allowing users to generate paperwork from stored data.
- **Localization** – i18next (`src/i18n.js`) powers instant IT/DE switching, with custom numeral & date utilities for DE formatting.

---

## Tech Stack
- Electron 8 with electron-forge tooling for packaging (`index.js`, `package.json` makers).
- React 16.8, React Router, Redux + Thunk, and Materialize CSS for the UI.
- Firebase Authentication and Realtime Database (`src/firebase/firebase.js`).
- Webpack 3 + Babel 6 pipeline for building renderer code (`webpack.config.js`).
- Jest + Enzyme for component tests (`src/tests/**`).
- Express wrapper for serving the production bundle on the web (`server/server.js`).

---

## Project Layout
```
├── src
│   ├── actions/ reducers/ selectors/ store/     ← Redux slices built via storeSection
│   ├── components/
│   │   ├── deals, clienti, oggetti, leads...   ← Feature dashboards & forms
│   │   ├── common/                             ← Shared inputs, utilities, modals
│   │   └── m2SquareAPI/                        ← WordPress synchronization helpers
│   ├── firebase/                               ← Firebase bootstrap
│   ├── routers/                                ← Public/Private routing, AppRouter
│   ├── styles/                                 ← SCSS source bundled into `public/dist`
│   └── utils/, i18n.js                         ← Formatting helpers and locale setup
├── public/                                     ← Static shell loaded by Electron / hosting
├── server/                                     ← Express server for deployment
├── functions/                                  ← Firebase Functions scaffold
└── index.js                                    ← Electron main process
```

---

## Prerequisites
- Node.js 14.x (Electron 8 ships with Node 12, so any modern 14.x LTS works well).
- Yarn (recommended) or npm.
- A Firebase project with Email/Password auth enabled.
- WordPress credentials with access to the m2Square REST endpoints.
- Access to the shared OneDrive directory if you want the desktop shortcuts (`~/m2Square - Arboscello & Fornari GbR/m2Square Office*`) to work, or adapt the paths in `index.js`.

---

## Environment Configuration
Webpack injects environment variables from `.env.development`, `.env.test`, or `.env` (production). Create the files you need at the repository root and provide the following keys:

```
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
REACT_APP_WPAPI=              # Base URL of the WordPress installation
WPAPI_USERNAME=
WPAPI_PASSWORD=
HEROKU_API=                   # Optional: target used by deployment scripts
```

Never commit real credentials; keep the `.env*` files out of version control.

---

## Installation
```bash
# install dependencies
yarn install
# or
npm install
```

---

## Development Workflow
There are two main ways to work on the renderer:

1. **Web mode** – great for quick UI development:
   ```bash
   yarn dev-server
   ```
   This starts `webpack-dev-server` with hot reload at http://localhost:8080.

2. **Electron mode** – mirrors the production desktop app:
   ```bash
   yarn build:dev --watch   # emits bundle under public/dist
   yarn electron            # launches Electron pointing to the static bundle
   ```
   Alternatively, `yarn start` (Electron Forge) will run the build and desktop shell in one step, but the manual watch flow gives you more control.

Firebase collections are loaded on authentication (`src/app.js`), so make sure you can sign in with a valid user before navigating feature routes.

---

## Testing
```bash
yarn test
```

Jest is configured via `jest.config.json`, and Enzyme adapters live under `src/tests`. Because most business logic sits in Redux actions and form helpers, unit tests focus on reducers/selectors; add regression tests alongside new components when possible.

---

## Building & Packaging
```bash
yarn build:prod          # production webpack build (writes to public/dist)
yarn electron            # run the built bundle inside Electron
yarn package             # create unpacked Electron apps
yarn make                # create platform installers via electron-forge
```

### Web deployment
- `yarn build:prod`
- Serve the `public/` folder via `node server/server.js`, Firebase Hosting (`firebase.json`), or any static host.

### Heroku
Heroku calls `yarn run heroku-postbuild` automatically, which simply runs the production build so the static bundle exists before the dyno boots the Express server.

---

## Data Flow & Integration Notes
- **Dynamic store sections** – `src/store/configureStore.js` enumerates all business entities (clienti, deals, oggetti, leads, fatture, newsletters, evaluations, offers, firma, utenti) and gives each collection a namespaced set of CRUD actions that operate directly on Firebase paths of the same name.
- **Authentication** – A Firebase auth state listener in `src/app.js` dispatches `login`/`logout`, triggers the initial data fetches, and routes users to `/deals` after sign-in. `PublicRoute`/`PrivateRoute` guard access to the feature dashboards.
- **WordPress sync** – `src/components/m2SquareAPI/*` transforms property records into multilanguage payloads and sends them to the WP REST API. Responses (post IDs, uploaded media IDs, etc.) are persisted back into Firebase so future updates know whether to create or update posts.
- **Document automation** – Modules under `src/components/moduli` use stored entity data plus `jsPDF` to generate PDF exports such as Makler Alleinauftrag, provision confirmations, or GDPR forms.
- **Utilities** – `src/components/common/utils.js` centralizes locale-aware currency/date formatting and JWT token generation for the WordPress API.
- **IPC bridges** – Renderer processes request desktop-only behavior (opening local folders, Immobilienscout24 API requests) through the `ipcMain` handlers declared in `index.js`. This keeps sensitive filesystem and network calls out of the browser sandbox.

---

## Troubleshooting
- When Electron shows a blank screen, confirm that `public/dist/bundle.js` exists. Re-run `yarn build:dev` or keep it in `--watch` mode.
- If WordPress sync buttons stay disabled, make sure the property has a cover image and localized titles (IT/DE/EN) and that you generated a JWT token through `generaToken`.
- To adapt the OneDrive integration to a different folder name, tweak the path logic near the top of `index.js`.
- If Firebase calls fail during development, double-check that you are loading the correct `.env.development` file; Webpack picks the file based on `NODE_ENV`.

---

## Contributing
1. Fork & clone.
2. Create a feature branch.
3. Add or update Jest tests when you add logic-heavy features.
4. Submit a PR describing the change, affected entities, and any deployment considerations (Firebase rules, new env vars, etc.).

Happy hacking!
