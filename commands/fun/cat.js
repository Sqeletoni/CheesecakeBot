// funny cat cmd
const CAT_API_URL = 'https://api.thecatapi.com/';
// const CAT_API_KEY = require("./config.json");

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('gato'),

    async execute(interaction){
        await interaction.reply(CAT_API_URL);
    }
};