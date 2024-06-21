<<<<<<< HEAD
const express = require("express");
const path = require("path");
const axios = require("axios"); // Using axios for HTTP requests

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const azureFunctionUrl = "https://dall-e-prototype.azurewebsites.net/api/HttpTrigger";
const azureFunctionKey = "5_4di6wlI5XoDuOltBIfcd6QlGOGybHX_iEa2jZtptUNAzFuvyagCw==";

app.post("/generate", async (req, res) => {
    const { prompt, size, style, quality } = req.body;

    try {
        const response = await axios.post(
            azureFunctionUrl,
            { prompt, size, style, quality },
            { headers: { 'x-functions-key': azureFunctionKey, 'Content-Type': 'application/json' } }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error calling Azure Function:", error);
        res.status(500).json({ error: "Failed to generate image" });
=======
const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  'https://thankful-river-0139bb800.5.azurestaticapps.net',  // Your static web app URL
  'http://localhost:3000'  // Add localhost for testing in development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);  // Allow requests with no origin (like mobile apps or curl requests)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-functions-key']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const azureFunctionUrl = "https://dall-e-prototype.azurewebsites.net/api/HttpTrigger";  // Adjust this URL as needed
const azureFunctionKey = "5_4di6wlI5XoDuOltBIfcd6QlGOGybHX_iEa2jZtptUNAzFuvyagCw==";

app.post('/generate', async (req, res) => {
  const { prompt, size, style, quality } = req.body;

  try {
    const response = await axios.post(
      azureFunctionUrl,
      { prompt, size, style, quality },
      { headers: { 'x-functions-key': azureFunctionKey, 'Content-Type': 'application/json' } }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Azure Function:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
