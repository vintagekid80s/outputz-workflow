import {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const GRAVE_ID = "1276118083622141967";

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

  const statuses = {
    started: "🟡 **Getting Started**",
    final: "🟠 **Final Cut Done**",
    ready: "🟢 **Video Ready**"
  };

  const status = statuses[interaction.customId];
  if (!status) return;

  await interaction.update({
    content:
      `${interaction.message.content}\n\n` +
      `📢 **Status Update:** ${status}\n` +
      `👤 Updated by: ${interaction.user}\n` +
      `<@${GRAVE_ID}>`,
    components: interaction.message.components
  });
});

client.login(process.env.DISCORD_TOKEN);
