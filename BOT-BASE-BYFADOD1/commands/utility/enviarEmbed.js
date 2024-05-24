const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// BEM ESSE COMANDO ENVIA UMA EMBED FIXA OU SEJA PARA EDITAR SO NO CODIGO, O USO? DIVULGAR ALGO SLA , USE A CRIATIVIDADE
module.exports = {
    data: new SlashCommandBuilder()
        .setName('enviar_embed')
        .setDescription('Envia uma embed com duas imagens e um link'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('COLOQUE OQUE QUISER')
            .setDescription('COLOQUE OQUE QUISER')
            .setColor(0x0099ff)
            .setImage('IMAEM AQUI') // Substitua pela URL da sua imagem (RECOMENDO O POST IMG)
            .setThumbnail('IMAGEM AQUI'); // Substitua pela URL da sua imagem (RECOMENDO O POST IMG)

        await interaction.reply({
            content: 'Aqui está o [link do nosso canal oficial!] LINK AQUI)', // Substitua pelo seu link
            embeds: [embed]
        });
    },
};
