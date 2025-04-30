// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Sample endpoint to receive user answers
app.post('/submit-answers', async (req, res) => {
  const userAnswers = req.body;

  // Here you can process the answers, e.g., save to a database
  console.log('Received user answers:', userAnswers);

  // Call the Gemini API to get product recommendations
  try {
    const response = await axios.post('https://api.gemini.com/v1/recommendations', {
      answers: userAnswers,
      apiKey: 'YOUR_GEMINI_API_KEY' // Replace with your actual API key
    });

    const recommendations = response.data; // Assuming the API returns recommendations in this format
    res.status(200).json({ message: 'Answers received successfully!', recommendations });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ message: 'Error retrieving recommendations' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});