// bot echos input
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('replies with your input')
    .addStringOption(option =>
        option.setName('input')
        .setDescription('the input that echos back')
        .setRequired(true)),

    async execute(interaction) {
        const input = interaction.options.getString('input');
        await interaction.reply(input);
    },
};
    