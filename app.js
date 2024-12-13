const express = require('express');
const cors = require('cors');  // Importa cors
const app = express();

// Abilita CORS per tutte le origini (puoi specificare domini se necessario)
app.use(cors());  // Questo permette tutte le richieste da qualsiasi origine

// Oppure puoi restringere l'accesso a specifici domini:
app.use(cors({
  origin: 'https://1096738819-atari-embeds.googleusercontent.com'  // Imposta il dominio corretto
}));

app.get('/key/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  res.json({ message: `Key for game ${gameId}` });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
