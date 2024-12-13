const express = require('express');
const cors = require('cors'); // Importa CORS
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

let scripts = {};

// Abilita CORS per tutte le origini
app.use(cors());

// Se vuoi limitare l'accesso solo a determinati domini, puoi farlo così:
// app.use(cors({
//     origin: 'https://1480224298-atari-embeds.googleusercontent.com' // Specifica il dominio che deve avere accesso
// }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/key/:id', (req, res) => {
    const gameId = req.params.id;
    const script = scripts[gameId] || '';
    res.send(script);
});

app.post('/key/:id', (req, res) => {
    const gameId = req.params.id;
    const script = req.body.script;

    if (!gameId) {
        res.status(400).send('No Game ID Specified');
        return;
    }

    scripts[gameId] = script;
    res.send('Successfully Executed');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
