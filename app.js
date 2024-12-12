const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Aggiungi questa linea per abilitare CORS per tutte le origini
app.use(cors()); // Abilita CORS per tutte le richieste

app.use(express.json());

// Variabile per salvare l'ultimo comando ricevuto
let lastCommand = null;

// Endpoint POST per ricevere comandi
app.post("/execute", (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).send({ error: "Comando mancante!" });
  }

  lastCommand = command;
  console.log(`Comando ricevuto: ${command}`);

  // Aggiungi la logica per eseguire il comando, ad esempio un'API che comunichi con Roblox

  res.status(200).send({ message: "Comando ricevuto con successo!" });
});

// Endpoint GET per ottenere l'ultimo comando
app.get("/command", (req, res) => {
  if (lastCommand) {
    res.status(200).send({ command: lastCommand });
    lastCommand = null; // Resetta il comando dopo averlo inviato
  } else {
    res.status(200).send({ command: null });
  }
});

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
