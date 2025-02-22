const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS

app.get("/proxy", async (req, res) => {
  const feedUrl = req.query.url;

  if (!feedUrl) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await axios.get(feedUrl, { timeout: 5000 });
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});

module.exports = app;
