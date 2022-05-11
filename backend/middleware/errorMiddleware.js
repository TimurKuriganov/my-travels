const errorHandler = (err, req, res, next) => {
  // we checking with what we got from res.status
  console.log('errHandler', err);
  console.log('err.name', err.name);
  const { status = 'error', message = 'Something went wrong' } = err;
  const statusCode = res.statusCode ? res.statusCode : 500;
  if (err.name === 'TypeError') {
    res.status(statusCode);
    res.json({
      message,
      status,
      errName: err.name
    });
  } else {
    res.status(statusCode);
    res.json({
      message: message,
      status: status,
    });
  }
};

module.exports = { errorHandler };


