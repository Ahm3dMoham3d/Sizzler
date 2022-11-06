module.exports = (catchAsync) => {
  return (req, res, next) => {
    catchAsync(req, res, next).catch((err) => next(err));
  };
};
