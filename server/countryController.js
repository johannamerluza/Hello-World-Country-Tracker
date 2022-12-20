const model = require('./countryModel');

const countryController = {};

countryController.getVisitedCountries = async (req, res, next) => {
  try {
    const data = await model.Country.find({ bucketList: false }).exec();
    res.locals.getCountries = data;
    return next();
  } catch (err) {
    return next({
      log: 'error in getVisitedCountries',
      message: 'error in getVisitedCountries, error: ' + err,
      err: err,
    });
  }
};

countryController.addCountry = (req, res, next) => {};

module.exports = countryController;
