//basic pingpong command
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pong!'),
    async execute(interaction){
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        interaction.editReply(`pong! ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    },
};