// kick user command
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription(`kick's target user.`)
        .addUserOption(option => 
            option.setName('target')
            .setDescription('member to kick')
            .setRequired(true)),
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        await interaction.reply(`${member} got kicked.`);
        member.kick();
    },
};