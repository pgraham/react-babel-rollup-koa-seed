# react-babel-rollup-koa-seed

Seed project for end-to-end web apps that use a Koa based API and a React based
UI.

----

## Usage

 1. `$ git clone https://github.com/pgraham/react-babel-rollup-koa-seed.git`
 2. `$ mv react-babel-rollup-koa-seed my-new-project`
 3. `$ cd my-new-project`
 4. `$ npm install`
 5. `$ git add package-lock.json`
 6. `$ git commit -m "Initial commit"`
 7. `$ npm start`

## Features

 - Single command development with `npm start`. Starts watches for local API
   server, and CSS and Javascript bundling.
 - Unit test scaffold which uses mocha and chai.
 - Staging and production build assembly

*Keep everything below this line as a starting point for your README*

----

## Where things are

### Server

Server sources are found in _src/srv_. The entry point is _src/srv/main.js_.
This file simply attaches the configuration found in
_src/srv/config/config.json_ to an instance of `App` defined in
_src/srv/app.js_.

### Client

Client sources are found _src/web_. The server will serve the client through
**koa-static** middleware.

#### CSS

CSS Sources are found in _src/web/css_ and are bundled to _src/web/styles.css_.

## Development

Development mode can be started with `npm start` this will start Nodemon for the
APIs and Postcss and Rollup for the client.

Nodemon configuration will use **SIGHUP** as the kill signal for child processes
as I was running into [an issue](https://github.com/remy/nodemon/issues/1025)
with the default.

## Testing

Tests can be run with `npm test`. Tests for server related modules should be
placed in _spec/srv_. Tests for client related modules should be placed in
_spec/web_.

Tests in _spec/srv_ will not be transpiled and should be
written as CommonJS modules (i.e. use `require`). Tests in _spec/web_ will be
transpiled and can be written as either CommonJS or ES2015 modules.

## Build assembly

Separate staging and production builds can be produced with the commands `npm
run stage` and `npm run release` respectively. When assembly is complete,
artifacts can be found in the _build/artifacts/_ directory.

### Environment config

Before the above commands will work, _tools/env/staging.json_ and
_tools/env/production.json_ files will need to be created. These files should
have the same format as _src/srv/config/config.json_.

### Staging

The staging build is intended to be run against a branch. The first step of the
staging build process is to run `npm version patch`. This will bump the patch
version in _package.json_, and create a commit and tag for the new version.

### Production

The production build is intended to be run against a tag that was previously
created by the `stage` command.
