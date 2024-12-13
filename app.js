const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

let scripts = {};

// Abilita CORS per permettere richieste da altri domini
app.use(cors());

// Usa express.json() per parsare il corpo delle richieste in formato JSON
app.use(express.json());

// Endpoint per ottenere lo script
app.get('/key/:id', (req, res) => {
    const gameId = req.params.id;
    const script = scripts[gameId] || '';
    res.send(script);
});

// Endpoint per impostare lo script
app.post('/key/:id', (req, res) => {
    const gameId = req.params.id;
    const script = req.body.script;

    if (!gameId || !script) {
        return res.status(400).send('No Game ID or Script Specified');
    }

    scripts[gameId] = script;
    res.send('Successfully Executed');
});

// Avvia il server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
