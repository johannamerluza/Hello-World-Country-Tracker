const model = require('./countryModel');

const countryController = {};

countryController.getAllCountries = (req, res, next) => {
  model.Country.find({}, (err, countries) => {
    if (err) {
      return next({
        log: 'error in getAllCountries',
        message: `error in getAllCountries, error: ${err}`,
        error: err,
      });
    } else {
      // console.log(countries);
      // console.log(visitedArray);
      res.locals.allCountries = countries;
      return next();
    }
  });
};

countryController.addCountry = (req, res, next) => {
  // console.log(req.body);
  // next();
  const { countryName, bucketList } = req.body;
  console.log(typeof bucketList);
  // if (!req.body.toDo) {
  //   const toDo = [];
  // } else {
  //   const toDo = req.body.toDo;
  // }
  model.Country.create({ countryName, bucketList }, (err, country) => {
    if (err) {
      console.log('ERRRORRR', err);
      return next({
        log: 'error in addCountry',
        message: `error in addCountry, error: ${err}`,
        error: err,
      });
    } else {
      res.locals.addCountry = country;
      console.log('country in addcountry middleware: ', country);
      return next();
    }
  });
};

module.exports = countryController;
