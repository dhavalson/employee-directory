const express = require('express');
const app = express();
const path = require('path');

// Middleware to serve static files (if using public folder)
app.use(express.static(path.join(__dirname, 'public')));

// Add any other middleware or routes here...

// ✅ Use environment PORT (for Render) or fallback to 3000 (for local dev)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
