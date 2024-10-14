const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://ayousuf2299:tVGBvfTAIC9i7yG1@gbc.6pvhi.mongodb.net/?retryWrites=true&w=majority&appName=comp3123Assignment1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
