const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token } = require('./config.json');
const { deployCommands } = require('./deploy-commands');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();

// Carregar comandos do diretório 'commands'
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

// Carregar comandos do diretório 'commands/utility'
const utilityPath = path.join(commandsPath, 'utility');
const utilityFiles = fs.readdirSync(utilityPath).filter(file => file.endsWith('.js'));

for (const file of utilityFiles) {
    const filePath = path.join(utilityPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Bot está online!');
    
    // Chama a função de deploy de comandos quando o bot está pronto
    deployCommands().then(() => {
        console.log('comandos carregados/salvos com sucesso!');
    }).catch(console.error);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Houve um erro ao executar este comando.', ephemeral: true });
    }
});

client.login(token);
