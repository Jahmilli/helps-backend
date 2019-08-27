import http from 'http';
import express from 'express';
import { applyMiddleware, applyRoutes } from './utils';
import routes from './services';
import errorHandlers from "./middleware/errorHandlers";
import middleware from './middleware';
import connect from './connect';

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});
process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3001 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);

// Mlabs Link
// const db = 'mongodb://admin:password1@ds341837.mlab.com:41837/mytestdatabase';

// Local Link
const db = 'mongodb://localhost/mytestdatabase';
connect({ db });