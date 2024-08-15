import { CommandInteraction, SlashCommandBuilder, type Interaction }  from "discord.js"

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: CommandInteraction) {
		await interaction.reply('Pong!');
	},
};