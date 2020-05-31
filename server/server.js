const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5353;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));
app.listen(PORT, () => {
  console.log('listening on port', PORT)
});

