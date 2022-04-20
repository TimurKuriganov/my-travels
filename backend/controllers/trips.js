// to get all trips
export const getTrips = (req, res, next) => {
  res.status(200).json({
    status: true,
    data: 'allTrips'
  });
}
