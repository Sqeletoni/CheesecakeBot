const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Loads yt songs")
        .addSubcommand((subcommand)=>
        subcommand.setName("song")
            .setDescription("Loads a single song")
            .addStringOption((option) => option.setName("url").setDescription("YT URL PLS").setRequired(true))
        )
        .addSubcommand((subcommand) =>
        subcommand
            .setName("playlist")
            .setDescription("Loads ur playlist a niffauw")
            .addStringOption((option) => option.setName("url").setDescription("playlist url pls").setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("search")
                .setDescription("search video")
                .addStringOption((option) => option.setName("searchterms").setDescription("terms that you search song").setRequired(true))
        ),
        run: async ({ client, interaction}) => {
            if (!interaction.member.voice.channel)
                return interaction.editReply("GO IN A VOICE CHANNEL DONKEY")

            const queue = await client.player.nodes.create(interaction.guild)
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)

            let embed = new MessageEmbed()

            if (interaction.options.getSubcommand() === "song"){
                let url = interaction.options.getString("url")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })
                if (result.tracks.length === 0)
                    return interaction.editReply("no tracks found")

                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** ADDED TO QUEUE`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({text: `Duration: ${song.duration}`})

            } else if (interaction.options.getSubcommand() === "playlist"){
                let url = interaction.options.getString("url")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })
                if (result.tracks.length === 0)
                    return interaction.editReply("no tracks found")

                const playlist = result.playlist
                await queue.addTrack(result.tracks)
                embed
                    .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** ADDED TO QUEUE`)
                    .setThumbnail(playlist.thumbnail)

            } else if (interaction.options.getSubcommand() === "search"){
                let url = interaction.options.getString("searchterms")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO
                })
                if (result.tracks.length === 0)
                    return interaction.editReply("no tracks found")

                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** ADDED TO QUEUE`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({text: `Duration: ${song.duration}`})
            }
            if (!queue.isPlaying()) await queue.node.play()
            await interaction.editReply({
                embeds: [embed]
            })
        },
}