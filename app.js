const express = require('express');
const cors = require('cors');
const app = express();

// Permetti tutte le origini
app.use(cors({
  origin: '*',  // Usa '*' per consentire tutte le origini
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Aggiungi i metodi desiderati
  allowedHeaders: ['Content-Type', 'Authorization'],  // Aggiungi le intestazioni che desideri autorizzare
}));

// Definisci le tue route
app.get('/key/:id', (req, res) => {
  res.json({ key: '123456' });
});

// Avvia il server
app.listen(5091, () => {
  console.log('Server is running on port 5091');
});
