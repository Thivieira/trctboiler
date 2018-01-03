# tRCTBOILER
My personal React-Redux-GraphQL-Express repo
## !important¡
**.envsample** should be renamed to .env and properly configured.

## Usage steps:

if you are using _yarn_:

`$ yarn start`
start the server and watch for file changes 
`$ yarn start:prod`
sets the environment to production, build the bundle, start the server and watch for file changes. 
`$ yarn dev`
sets the environment to development makes webpack-dev-server do its thing. (loads webpack.config.dev.js)
`$ yarn build`
sets the environment to production, build the bundle and loads webpack.config.prod.js

**tip**
if using _npm_ instead, replace all `yarn` with `npm run`.

### repo features: 
- use of _dotenv_ module for attaching .env variables.
- hot reloading of components in dev environment.
- scss + postcss autoprefixer for css preprocessing.
- code chunk splitting between app logic and vendor bundle.
- caching of vendor modules.
- service worker provided by _offline-plugin_ module.
- obfuscation and minification of bundles.
- image loading and compression.

### Thats all!
