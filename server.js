const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect DB
connectDB();

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/d', require('./routes/api/dumps'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API RUNNING');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
