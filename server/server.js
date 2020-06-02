const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let calc = require('./modules/calc.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

const port = process.env.PORT || 5353;
app.listen(port, () => {
  console.log('listening on port', port);
});

app.get('/calc', (req, res) => {
  res.send(calc);
});

app.post('/calc', (req, res) => {
  console.log('User is trying to POST a calculation.');
  console.log(req.body);
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  const operator = req.body.operator;
  let ans = null;
  if (operator === '+') {
    ans = num1 + num2;
    console.log(ans);
  } else if (operator === '-') {
    ans = num1 - num2;
  } else if (operator === '*') {
    ans = num1 * num2;
  } else if (operator === '/') {
    ans = (num1 / num2).toFixed(4);
  } else if (operator === '^') {
    ans = num1 ** num2;
  }
  // if all parameters are valid, send 201 status code, else send 400 status code
  if ((num1 !== undefined) && (num2 !== undefined) && (operator !== undefined)) {
    calc.push({ num1: num1, num2: num2, operator: operator, ans: ans });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});

app.delete('/calc', (req, res) => {
  calc = [];
  res.sendStatus(204);
});