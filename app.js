const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create a new Express app
const app = express();

// Use the cors middleware to allow CORS requests
app.use(cors({
  origin: 'https://884699221-atari-embeds.googleusercontent.com'
}));

// Use the body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Create an endpoint for the executor
app.post('/execute', (request, response) => {
  // Get the script from the request body
  const script = request.body.script;

  // Validate the script
  if (typeof script !== 'string') {
    return response.status(400).send({ error: 'Invalid script' });
  }

  // Load and execute the script
  let result;
  try {
    result = loadstring(script)();
  } catch (error) {
    return response.status(500).send({ error: `Error executing script: ${error.message}` });
  }

  // Send a response to the client
  response.send({ result });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
