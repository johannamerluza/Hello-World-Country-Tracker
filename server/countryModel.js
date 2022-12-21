const mongoose = require('mongoose');
const MONGO_URI = require('./secrets');

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'helloWorld',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const countrySchema = new Schema({
  countryName: { type: String, required: true },
  bucketList: { type: Boolean, required: true },
  toDo: [],
});

const Country = mongoose.model('country', countrySchema);

module.exports = {
  Country,
};
