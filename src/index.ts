import { REST } from '@discordjs/rest';
import {
	Client,
	EmbedBuilder,
	Events,
	GatewayIntentBits, Partials, Routes
} from 'discord.js';
let clientId = process.env.clientId!
let guildId = process.env.guildId!
let token = process.env.token!

import IntroduceCommand from './commands/Introduce';

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction,],
});

const rest = new REST({ version: '10' }).setToken(token);

client.on(Events.ClientReady, () => console.log(`${client.user!.tag} has logged in!`));

client.on(Events.InteractionCreate, (interaction) => {
	if (interaction.isChatInputCommand()) {
		console.log('Chat Command');
		if (interaction.commandName === 'introduce') {

			let embed = new EmbedBuilder()
				.setTitle(interaction.user.username)
				.addFields(
					{
						name: "Nickname",
						value: interaction.options.getString("name")!.toString()
					},
					{
						name: "Alter",
						value: interaction.options.getInteger("age")!.toString()
					},
					{
						name: "Beschreibung",
						value: interaction.options.getString("description")!
					},
					{
						name: "Hobbys",
						value: interaction.options.getString("hobbys")!
					}
				).setColor("Green")

			if (interaction.options.getString("job") !== null)
				embed.addFields({
					name: "Job",
					value: interaction.options.getString("job")!
				})
			if (interaction.options.getAttachment("picture") !== null)
				embed.setImage(interaction.options.getAttachment("picture")!.proxyURL);

			let channel = interaction.client.channels.cache.get("1030550857302954004")!;
			if (channel.isTextBased())
				channel.send({
					embeds: [embed.toJSON()]
				})

			interaction.reply("Danke, dass du dir die Zeit genommen hast.");
		}
	}
});

async function main() {
	const commands = [
		IntroduceCommand
	];
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
			body: commands,
		});
		client.login(token);
	} catch (err) {
		console.log(err);
	}
}

main();