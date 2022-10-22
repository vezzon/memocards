const errorHandler = (err, req, res, next) => {
  const errorString = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
  console.log(errorString);
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status);
  res.json({ message: err.message });
};

module.exports = errorHandler;
