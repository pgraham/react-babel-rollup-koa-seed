# react-babel-rollup-koa-seed

Seed project for end-to-end web apps that use a Koa based API and a React based
UI.

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

Nodemon configuration will use **SIGHUP** as the kill signal for child process
as I was running into [an issue](https://github.com/remy/nodemon/issues/1025)
with the default.
