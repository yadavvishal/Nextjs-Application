const express = require('express');
const basicAuth = require('express-basic-auth');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const app = express();
const port = 3000;

// Dummy user credentials
const users = { 'admin': 'admin' };

// JWT secret key (change this in production)
const jwtSecretKey = 'vishalyadav';

// Define a schema for request body validation
const validationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

// Authentication middleware
app.use(basicAuth({
  users,
  unauthorizedResponse: 'Authentication failed',
}));

// Authorization function (example)
function userHasPermission(user) {
  // Implement your authorization logic here
  // For example, check user roles or permissions
  return true; // Replace with your authorization logic
}

// Protected route for testing authorization
app.get('/protected-route', (req, res) => {
  // Check for authorization
  if (!req.auth) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  // Validate request body
  const { error } = validationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  // Additional authorization logic
  if (!userHasPermission(req.auth.user)) {
    return res.status(403).json({ error: 'Authorization failed' });
  }

  // Generate a JWT token for authorization
  const token = jwt.sign({ user: req.auth.user }, jwtSecretKey, { expiresIn: '1h' });

  res.json({ message: 'Authorization successful. This is a protected route.', token });
});

// Custom error handling middleware
app.use((err, req, res, next) => {
  // Handle errors and send responses here
  console.error(err);

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({ error: 'Authorization failed' });
  }

  // Handle other errors
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
