// to get all trips
const getTrips = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'allTrips'
  });
}
module.exports = { getTrips };
