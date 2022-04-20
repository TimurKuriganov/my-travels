const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config');
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/trips', require('./routes/trips.js'));



app.listen(PORT, () => {
  console.log(`Server stated on port ${PORT}`);
});
