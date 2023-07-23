// commands that returns server information
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('information about the server'),
    async execute(interaction){
        await interaction.reply(`Welcome to ${interaction.guild.name} and has ${interaction.guild.max_members}`);
    },
};