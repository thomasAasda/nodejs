const express = require('express');
const cors = require('cors');
const child_process = require('child_process'); // Per eseguire comandi di sistema
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Endpoint per eseguire comandi (flessibile, ma sicuro)
app.post('/execute', (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).send({ error: "Comando mancante!" });
  }

  // Logga il comando ricevuto per monitoraggio
  console.log(`Comando ricevuto: ${command}`);

  // Controllo basilare per evitare comandi pericolosi
  if (command.toLowerCase().includes("rm") || command.toLowerCase().includes("shutdown") || command.toLowerCase().includes("reboot")) {
    return res.status(400).send({ error: "Comando pericoloso bloccato!" });
  }

  // Esegui il comando in modo sicuro
  try {
    const result = child_process.execSync(command, { encoding: 'utf-8' }); // Esegui il comando in modo sincrono
    console.log('Comando eseguito con successo');
    res.status(200).send({ message: 'Comando eseguito con successo', result });
  } catch (error) {
    console.error('Errore nell\'esecuzione del comando:', error);
    res.status(500).send({ error: 'Errore nell\'esecuzione del comando', details: error.message });
  }
});

// Endpoint per ottenere l'ultimo comando eseguito (per debug o monitoraggio)
let lastCommand = null;

app.post('/setLastCommand', (req, res) => {
  const { command } = req.body;
  lastCommand = command;
  res.status(200).send({ message: 'Comando impostato con successo' });
});

app.get('/getLastCommand', (req, res) => {
  if (lastCommand) {
    res.status(200).send({ lastCommand });
  } else {
    res.status(404).send({ message: 'Nessun comando eseguito ancora' });
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
