const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

//server index html
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

console.log(path.resolve(__dirname, '../client/index.html'));

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

/* start server */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
