const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware function to log request details
function requestLogger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

// Apply middleware
app.use(bodyParser.json());
app.use(requestLogger);

// Route to get public posts from a user
app.get('/user/:userId/posts', async (req, res) => {
  const userId = req.params.userId;
  const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace with your access token

  console.log(`Fetching posts for user ID: ${userId}`);

  try {
    const response = await axios.get(`https://graph.facebook.com/v12.0/${userId}/posts`, {
      params: {
        fields: 'message,full_picture,permalink_url',
        access_token: accessToken
      }
    });

    console.log('API response:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching posts:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
