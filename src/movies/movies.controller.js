const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const list = async (req, res, next) => {
  const { is_showing } = req.query;
  if (is_showing === "true") {
     res.json({ data: await moviesService.listIsShowingTrue(true) });
  } else {
     res.json({ data: await moviesService.list() });
  }
};

const movieExists = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.movie = movie;
     next();
  } else {
     next({
      status: 404,
      message: "Movie cannot be found.",
    });
  }
};

const read = async (req, res, next) => {
   res.json({ data: res.locals.movie });
};

module.exports = {
  movieExists: asyncErrorBoundary(movieExists),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  list: [asyncErrorBoundary(list)],
};