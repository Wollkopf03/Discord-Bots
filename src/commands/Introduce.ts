import { SlashCommandBuilder } from '@discordjs/builders';

const introduceCommand = new SlashCommandBuilder()
	.setName('introduce')
	.setDescription('Introduce Yourself')
	.addStringOption((option) =>
		option
			.setName('name')
			.setDescription('Your Nickname')
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName('description')
			.setDescription('A short description of yourself')
			.setRequired(true)
	)
	.addIntegerOption((option) =>
		option
			.setName('age')
			.setDescription('Your age')
			.setRequired(true)
	).addStringOption((option) =>
		option
			.setName('hobbys')
			.setDescription('Your Hobbys')
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName('job')
			.setDescription('Your Job')
			.setRequired(false)
	)
	.addAttachmentOption((option) =>
		option
			.setName('picture')
			.setDescription('A short picture of yourself')
			.setRequired(false)
	)

export default introduceCommand.toJSON();