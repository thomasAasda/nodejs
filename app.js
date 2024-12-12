const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Usa la porta dinamica che Railway fornisce tramite la variabile di ambiente PORT
const port = process.env.PORT || 3000;

// Log per verificare quale porta è stata assegnata
console.log('Porta in ascolto:', port);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server attivo');
});

app.post('/execute', (req, res) => {
    const { command } = req.body;

    if (command) {
        console.log(`Comando ricevuto: ${command}`);
        res.json({ success: true, command: command });
    } else {
        res.status(400).json({ success: false, error: 'Comando non fornito' });
    }
});

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
