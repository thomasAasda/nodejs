const express = require("express");
const cors = require("cors"); // Aggiunto CORS
const app = express();
const port = 3000;

// Middleware per parsing JSON
app.use(express.json());
app.use(cors()); // Abilitazione di CORS

// Variabile per salvare l'ultimo comando ricevuto
let lastCommand = null;

// Endpoint POST per ricevere comandi
app.post("/execute", (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).send({ error: "Comando mancante!" });
  }

  lastCommand = command; // Salva il comando
  console.log(`Comando ricevuto: ${command}`);
  res.status(200).send({ message: "Comando ricevuto con successo!" });
});

// Endpoint GET per restituire l'ultimo comando
app.get("/", (req, res) => {
  if (lastCommand) {
    res.status(200).send({ command: lastCommand });
    lastCommand = null; // Resetta il comando dopo averlo inviato
  } else {
    res.status(200).send({ command: null });
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
