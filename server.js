const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // Port for your server

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/beaconDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.error('Failed to connect to MongoDB', err);
    } else {
        console.log('Connected to MongoDB');
    }
});

// Schema and Model
const UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

// Routes
app.post('/create-account', async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const newUser = new User({ fullName, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Account created successfully!' });
    } catch (err) {
        res.status(400).json({ error: 'Error creating account', details: err });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
