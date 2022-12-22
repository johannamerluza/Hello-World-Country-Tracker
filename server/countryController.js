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
  const { countryName, bucketList } = req.body;
  console.log(typeof bucketList);
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

countryController.deleteCountry = (req, res, next) => {
  const { countryName } = req.body;
  model.Country.findOneAndDelete({ countryName }, (err, country) => {
    if (err) {
      return next({
        log: 'error in deleteCountry',
        message: `error in deleteCountry, error: ${err}`,
        error: err,
      });
    } else {
      console.log('deleted country: ', country);
      res.locals.deleteCountry = country;
      return next();
    }
  });
};

countryController.updateCountry = (req, res, next) => {
  const { countryName } = req.body;
  console.log(req.body);
  model.Country.findOneAndUpdate(
    { countryName },
    { bucketList: false },
    (err, country) => {
      if (err) {
        return next({
          log: 'error in updateCountry',
          message: `error in updateCountry, error: ${err}`,
          error: err,
        });
      } else {
        console.log('updated country: ', country);
        res.locals.updateCountry = country;
        return next();
      }
    },
  );
};

module.exports = countryController;
