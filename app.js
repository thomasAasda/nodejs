const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

let scripts = {};

app.use(cors());  // Abilita CORS
app.use(express.json());

// Gestisce la richiesta GET per ottenere uno script Lua
app.get('/key/:id', (req, res) => {
    const gameId = req.params.id;
    const script = scripts[gameId] || '';
    res.send(script);
});

// Gestisce la richiesta POST per inviare uno script Lua
app.post('/key/:id', (req, res) => {
    const gameId = req.params.id;
    const script = req.body.script;

    if (!gameId || !script) {
        return res.status(400).send('Game ID or script missing');
    }

    scripts[gameId] = script;
    res.send('Successfully Executed');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
