const { Client, GatewayIntentBits } = require('discord.js');
const net = require('net');

// Token del bot Discord
const DISCORD_TOKEN = 'MTMxNjUyMzg0NDY2MzY0NDIyMg.GlxTU0.x9fDoia9EK7XRtAMx8DkBjC4__4dWnIAdrGzHo';
const ROBLOX_SERVER_IP = '127.0.0.1'; // Indirizzo del server Roblox
const ROBLOX_SERVER_PORT = 3001;    // Porta per la comunicazione con Roblox

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let gameSessionActive = false; // Flag per tracciare lo stato della sessione di gioco

// Funzione per inviare un comando al server Roblox tramite socket
async function sendCommandToRoblox(command) {
    return new Promise((resolve, reject) => {
        const socket = new net.Socket();

        socket.connect(ROBLOX_SERVER_PORT, ROBLOX_SERVER_IP, () => {
            socket.write(command, 'utf-8', () => {
                socket.end();
                resolve();
            });
        });

        socket.on('error', (err) => {
            console.error(`Errore nella connessione con Roblox: ${err.message}`);
            reject(err);
        });
    });
}

client.once('ready', () => {
    console.log(`Bot connesso come ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    // Ignora i messaggi inviati dal bot stesso
    if (message.author.bot) return;

    // Comando per iniziare la sessione
    if (message.content === '/start') {
        if (!gameSessionActive) {
            gameSessionActive = true;
            await message.channel.send('Sessione di gioco avviata! I prossimi comandi saranno inviati al gioco.');
        } else {
            await message.channel.send('La sessione di gioco è già attiva.');
        }
        return;
    }

    // Comandi da inviare al gioco se la sessione è attiva
    if (gameSessionActive) {
        try {
            await sendCommandToRoblox(message.content);
            await message.channel.send(`Comando inviato al gioco: ${message.content}`);
        } catch (err) {
            await message.channel.send(`Errore nell'invio del comando al gioco: ${err.message}`);
        }
        return;
    }

    // Notifica se la sessione non è attiva
    if (message.content.startsWith('/')) {
        await message.channel.send('Sessione di gioco non attiva. Usa /start per iniziare.');
    }
});

// Avvia il bot
client.login(DISCORD_TOKEN);
