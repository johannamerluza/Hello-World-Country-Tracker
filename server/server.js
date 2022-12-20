const express = require('express');
const countryController = require('./countryController');
const fsCallback = require('fs');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');

app.use(cors());

//server index html
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('/api', (req, res) => {
  data = [
    ['germany', 0],
    ['united states', 100],
    ['brazil', 0],
    ['canada', 100],
    ['france', 0],
    ['china', 100],
  ];
  // console.log(data);
  return res.status(200).json(data);
});

// app.get('/api', countryController.getVisitedCountries, (req, res) => {
//   return res.status(200).json(res.locals.getCountries);
// });

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for..."),
);

/* start server */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
