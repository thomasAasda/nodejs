const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Abilita CORS per permettere richieste da origini diverse
app.use(cors());

// Middleware per parsare il corpo delle richieste JSON
app.use(bodyParser.json());

// Verifica che la root sia attiva
app.get('/', (req, res) => {
    res.send('Server attivo');
});

// Gestione della richiesta POST per eseguire il comando
app.post('/execute', (req, res) => {
    const { command } = req.body;

    if (command) {
        // Simula l'esecuzione del comando (puoi aggiungere logica qui)
        console.log(`Comando ricevuto: ${command}`);
        res.json({ success: true, command: command });
    } else {
        res.status(400).json({ success: false, error: 'Comando non fornito' });
    }
});

// Avvio del server
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
