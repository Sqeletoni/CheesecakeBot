//basic pingpong command
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pong!'),
    async execute(interaction){
        await interaction.reply(`Pong! ${client.ws.ping}ms.`);
    },
};