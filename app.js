const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());

app.post('/receiveCommand', (req, res) => {
    const command = req.body.command;
    console.log(`Comando ricevuto: ${command}`);

    // Qui puoi inviare il comando al server di Roblox usando HttpService
    // (usando il codice Roblox mostrato sopra per ricevere il comando)

    res.send({ status: "success" });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
