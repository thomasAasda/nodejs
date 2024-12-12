const { Client, GatewayIntentBits } = require('discord.js');
const net = require('net');

// Token del bot Discord
const DISCORD_TOKEN = 'MTMxNjUyMzg0NDY2MzY0NDIyMg.G8XY2T.8J9lLRtOSgfi1EF9zjWnPGltLhrLB9tlzXYx8U';
// Indirizzo del server Roblox
const ROBLOX_SERVER_IP = '127.0.0.1';
const ROBLOX_SERVER_PORT = 12345;

// Crea il client Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

// Funzione per inviare comandi al server Roblox tramite socket
function sendCommandToRoblox(command) {
    const clientSocket = new net.Socket();

    clientSocket.connect(ROBLOX_SERVER_PORT, ROBLOX_SERVER_IP, () => {
        console.log('Connesso al server Roblox');
        clientSocket.write(command);
    });

    clientSocket.on('error', (err) => {
        console.error('Errore nella connessione:', err);
    });

    clientSocket.on('close', () => {
        console.log('Connessione chiusa');
    });
}

// Evento: quando il bot è pronto
client.once('ready', () => {
    console.log(Bot connesso come ${client.user.tag});
});

// Evento: quando viene ricevuto un messaggio
client.on('messageCreate', (message) => {
    if (message.author.bot) return; // Ignora i messaggi dei bot
    if (message.content.startsWith('!roblox ')) {
        const command = message.content.slice(8).trim();
        sendCommandToRoblox(command);
        message.reply(Comando inviato: \${command}\``);
    }
});

// Avvia il bot
client.login(DISCORD_TOKEN);
