import express = require('express');
import bodyParser = require('body-parser');
const PORT = 3001;

// Create a new express application instance
const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/v1/test', (req, res) => {
  console.log('A request to test was made');
  let results = {
    message: 'This is a test message from helps-backend'
  };
  res.send(results);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});