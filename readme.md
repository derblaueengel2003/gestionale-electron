# Gestionale m2Square

Gestionale m2Square is the in-house CRM used by m2Square to orchestrate the full real-estate cycle: capture leads, track deals, manage properties/contacts/invoices, produce legal PDFs, and synchronize listings with the public WordPress site. The UI is a React/Redux SPA, the backend is Firebase, and Electron wraps everything with desktop-only workflows (OneDrive shortcuts, API proxies, WordPress tooling).

---

## Quick facts

| Topic     | Details                                                        |
| --------- | -------------------------------------------------------------- |
| Runtime   | Electron 8.5.1 (electron-forge)                                |
| Renderer  | React 16.8 + Redux/Thunk + Materialize CSS                     |
| Data      | Firebase Auth + Realtime Database (`src/firebase/firebase.js`) |
| Build     | Webpack 3 + Babel 6 (see `webpack.config.js`)                  |
| Tests     | Jest 20 + Enzyme (`yarn test`)                                 |
| Packaging | `yarn make` (forge makers: zip, squirrel, deb, rpm)            |

Feature directories live under `src/components`: `deals/`, `clienti/`, `oggetti/`, `leads/`, `fatture/`, `newsletters/`, `evaluation/`, `utenti/`, `firma/`, `offers/`, and `moduli/` for document templates. `src/store/storeSection.js` autogenerates CRUD Redux logic per entity, and `src/components/m2SquareAPI/` handles WordPress synchronization.

---

## Prerequisites

- Node.js 14.x LTS (newer works, but Node 20 requires `--ignore-optional` installs to avoid native rebuild issues)
- Yarn 1.x (recommended) or npm
- Firebase project with Email/Password auth
- WordPress credentials with REST/JWT access
- Access to the `OneDrive` OneDrive directory (or update `index.js` to match your path)

---

## Environment

Webpack injects variables from `.env.development`, `.env.test`, or `.env`. These keys must exist:

````
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
REACT_APP_WPAPI=
WPAPI_USERNAME=
WPAPI_PASSWORD=
HEROKU_API=                 # optional (Heroku deployment target)
``

Never commit `.env*` files.

---

## Installation

We purposely skip optional dependencies because `@parcel/watcher` (pulled by Dart Sass) fails to rebuild for Electron 8 under Node 20.

```bash
yarn install --ignore-optional --ignore-scripts --force
# then fetch Electron’s binary
node node_modules/electron/install.js
````

If you use npm: `npm install --no-optional` + run `node node_modules/electron/install.js`.

---

## Development workflow

Renderer-only (fast iteration):

```bash
yarn dev-server             # webpack-dev-server on http://localhost:8080
```

Electron (full stack):

```bash
yarn build:dev --watch      # emits public/dist/bundle.js
yarn electron               # launches Electron pointing at public/index.html
# or
yarn start                  # electron-forge start
```

Firebase data loads after auth (`src/app.js`), so sign in with a valid user before navigating to feature routes (`/deals`, `/clienti`, etc.).

---

## Testing

```bash
yarn test
```

Jest is configured via `jest.config.json`. Snapshot tests for React components live under `src/tests/`. Add/update tests for reducers/selectors when changing business logic.

---

## Packaging & deployment

```bash
yarn build:prod             # production webpack build (public/dist)
yarn package                # forge package
yarn make                   # create installers/archives under out/make
```

Web deployment options:

1. Firebase Hosting (uses `public/` as configured in `firebase.json`).
2. Heroku + Express (`server/server.js`; relies on `heroku-postbuild`).
3. Any static host serving `public/` after `yarn build:prod`.

Remember to run `node node_modules/electron/install.js` before packaging if you reinstalled modules with scripts disabled.

---

## Architecture notes

- **Redux storeSection**: `src/store/storeSection.js` generates CRUD actions & reducers pointing straight at Firebase paths. `src/store/configureStore.js` registers all sections and wires them into the store.
- **WordPress sync**: `src/components/m2SquareAPI/` handles JWT token generation (`generaToken`), payload creation (`creaPayload`), media upload, and translation workflows. Successful posts persist `postId*` fields back to Firebase.
- **Document automation**: `src/components/moduli` builds PDFs/forms (MAA, Provision, Vollmacht, DSGVO, etc.) using stored entity data and `jsPDF`.
- **Localization**: `src/i18n.js` enables Italian/German translations; numeral/date helpers live in `src/components/common/utils.js`.
- **IPC bridges**: `index.js` exposes `folder:open`, `link:open`, and `is24:*` channels so the renderer can request desktop-only behavior without violating browser sandbox restrictions.

---

## Troubleshooting

| Problem                                           | Fix                                                                                     |
| ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `Electron failed to install correctly…`           | Run `node node_modules/electron/install.js` so `path.txt`/`dist/` exist.                |
| `node-gyp` errors compiling `@parcel/watcher`     | Delete `node_modules/@parcel` and reinstall with `--ignore-optional`.                   |
| Packaged app crashes with `/Users/.../undefined/` | Provide `ONEDRIVE` env or adapt the OneDrive logic in `index.js`.                       |
| Blank Electron window                             | Ensure `public/dist/bundle.js` exists (rerun `yarn build:dev`).                         |
| WordPress sync buttons disabled                   | Ensure the property has a cover image plus IT/DE/EN titles, then refresh the JWT token. |
| Firebase auth fails                               | Verify `.env.*` for the current NODE_ENV contains a valid Firebase config.              |

---

## Contributing

1. Fork + clone.
2. Create a branch.
3. Keep tests up to date (`yarn test`).
4. Document new env vars / deployment steps.
5. Open a PR describing the change and any risks.

Happy hacking! 🏡💻
