const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('fs');
const path = require('path');

async function deployCommands() {
    const commands = [];

    // Ajuste para ler a pasta correta onde os comandos estão armazenados
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands', 'utility')).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/utility/${file}`);
        if (command.data && typeof command.data.toJSON === 'function') {
            commands.push(command.data.toJSON());
        } else {
            console.error(`The command at './commands/utility/${file}' is missing a required "data" property or "toJSON" method.`);
        }
    }

    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

module.exports = { deployCommands };
