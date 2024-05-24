const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('enviar_embed')
        .setDescription('Envia uma embed com duas imagens e um link'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Acesse o link anexado para entrar no nosso canal oficial')
            .setDescription('Esse e o canal onde postaremos as novidades e noticias sobre o desenvolvimento de nossos jogos , alem de fazermos conteudo relacionado a outros jogos e sobre o mundo de desenvolvimento de games!')
            .setColor(0x0099ff)
            .setImage('https://i.postimg.cc/V6tkxGd6/Captura-de-tela-de-2024-05-17-12-25-43.png') // Substitua pela URL da sua imagem
            .setThumbnail('https://i.postimg.cc/d3KVw2y9/Captura-de-tela-de-2024-05-17-12-06-12.png'); // Substitua pela URL da sua imagem

        await interaction.reply({
            content: 'Aqui está o [link do nosso canal oficial!](https://www.youtube.com/channel/UCwv2_xxrUCHziatF9UjsRSQ)', // Substitua pelo seu link
            embeds: [embed]
        });
    },
};
