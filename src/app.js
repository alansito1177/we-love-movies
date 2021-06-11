if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require('cors');
const logger = require("./config/logger");

const moviesRouter = require('./movies/movies.router');
const moviesTheatersRouter = require('./movies_theaters/movies_theaters.router');
const reviewsRouter = require('./reviews/reviews.router');
const theatersRouter = require('./theaters/theaters.router');
const criticsRouter = require('./critics/critics.router');

const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());

app.use('/movies', moviesRouter);
app.use('/movies_theaters', moviesTheatersRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);
app.use('/critics', criticsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
