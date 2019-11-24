const express = require('express');
const cors = require('cors');
const { names } = require('./data.json');
const Search = require('./search.js');

const searchObj = new Search(names);

const app = express();
app.use(cors());
const port = 4200;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});

app.get('/names', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.json(names);
  }
  return res.json(searchObj.query(q));
});
