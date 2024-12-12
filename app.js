const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Abilita CORS per permettere richieste da origini diverse
app.use(cors());

// Middleware per parsare il corpo delle richieste JSON
app.use(bodyParser.json());

// Gestione della richiesta POST per eseguire il comando
app.post('/execute', (req, res) => {
    const { command } = req.body; // Si aspetta il comando nel corpo della richiesta

    if (command) {
        // Qui puoi aggiungere il codice per gestire i comandi
        console.log(`Comando ricevuto: ${command}`);
        // Restituisce una risposta JSON con il comando ricevuto
        res.json({ success: true, command: command });
    } else {
        // Se non è stato inviato alcun comando, restituiamo un errore 400
        res.status(400).json({ success: false, error: 'Comando non fornito' });
    }
});

// Avvio del server
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
