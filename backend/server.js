require('dotenv').config();
const express = require('express');
const cors = require('cors');
const analyzeRoute = require('./routes/analyze');
const resumeBuilderRoute = require('./routes/resume-builder'); // ← ADD

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', analyzeRoute);
app.use('/api/resume', resumeBuilderRoute); // ← ADD

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});