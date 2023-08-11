const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // To access environment variables
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost/db_ds', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

// Middleware
app.use(express.json());
app.use(cors());

// Schema for contact messages
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const ContactMessage = mongoose.model('ContactMessage', contactSchema);

// Schema for hiring inquiries
const hireMeSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const HireMeInquiry = mongoose.model('HireMeInquiry', hireMeSchema);


// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
    req.admin = decoded;
    next();
  });
};

// Admin login route
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const adminUsername = "admin";
  const adminPassword = "password";
  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Route to handle contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  const contactMessage = new ContactMessage({ name, email, message });
  contactMessage.save()
    .then(() => res.json({ message: 'Form submitted successfully' }))
    .catch(err => res.status(500).json({ message: 'An error occurred' }));
});

// Route to handle "Hire Me" form submission
app.post('/api/hire-me', (req, res) => {
  const { name, email, message } = req.body;
  const hireMeInquiry = new HireMeInquiry({ name, email, message });
  hireMeInquiry.save()
    .then(() => res.json({ message: 'Inquiry submitted successfully' }))
    .catch(err => res.status(500).json({ message: 'An error occurred' }));
});

// Route to get all contact messages
app.get('/api/contact-messages', (req, res) => {
  ContactMessage.find({})
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json({ message: 'An error occurred' }));
});

// Route to get all hiring inquiries
app.get('/api/hire-me-inquiries', (req, res) => {
  HireMeInquiry.find({})
    .then(inquiries => res.json(inquiries))
    .catch(err => res.status(500).json({ message: 'An error occurred' }));
});

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
// Route to fetch all contact messages
app.get('/api/admin/contact-messages', (req, res) => {
  ContactMessage.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json({ message: 'An error occurred' }));
});

// Route to fetch all hiring inquiries
app.get('/api/admin/hire-me-inquiries', (req, res) => {
  HireMeInquiry.find()
    .then(inquiries => res.json(inquiries))
    .catch(err => res.status(500).json({ message: 'An error occurred' }));
});

// Route to delete a contact message by ID
app.delete('/api/admin/contact-messages/:id', (req, res) => {
  ContactMessage.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Message deleted successfully' }))
    .catch(err => res.status(500).json({ message: 'An error occurred' }));
});

// Route to delete a hiring inquiry by ID
app.delete('/api/admin/hire-me-inquiries/:id', (req, res) => {
  HireMeInquiry.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Inquiry deleted successfully' }))
    .catch(err => res.status(500).json({ message: 'An error occurred' }));
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
