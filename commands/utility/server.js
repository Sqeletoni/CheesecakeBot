// commands that returns server information
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('information about the server'),
    async execute(interaction){
        await interaction.reply(`Welcome to ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    },
};