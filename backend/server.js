require('dotenv').config();
const express = require('express');
const cors = require('cors');
const competitorRoutes = require('./routes/competitorRoutes');
const connectDB=require('./config/db')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Competitor Coffee Backend is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'Competitor Coffee Backend is running' });
});

app.use('/api/coffees', competitorRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Competitor Coffee Backend running on port ${PORT}`);
  console.log(`Dynamic Pricing API: ${process.env.EXISTING_DYNAMIC_PRICING_API_URL || 'NOT CONFIGURED'}`);
});
