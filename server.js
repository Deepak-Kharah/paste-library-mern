const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect DB
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API RUNNING');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
