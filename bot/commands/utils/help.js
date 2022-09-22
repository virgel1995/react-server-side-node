const { MessageEmbed } = require("discord.js");

const GuildConfig = require("../../../Database/schemas/Guild.js");



const { owners } = require("../../../config.json");
module.exports = {
  name: "help",
  description: "Shows all commands Or shows more info about a command",
  category: "util",
  cooldown: 2,
  aliases: ["h"],
  async execute(bot, message, args) {
    		const guildConf = await GuildConfig.findOne({
			guildId: message.guild.id
		});
    const prefix = guildConf.prefix;
    const cmdArgs = args[0];

    if (cmdArgs) {
      const cmd =
        bot.commands.get(cmdArgs) || bot.commands.get(bot.aliases.get(cmdArgs));
      if (!cmd) return message.channel.send("Command or alias not found");

      const aliases = cmd.aliases ? cmd.aliases.map((alias) => alias) : "None";
      const options = cmd.options
        ? cmd.options.map((option) => option)
        : "None";
      const cooldown = cmd.cooldown ? `${cmd.cooldown}s` : "None";

      const embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle(`Command: ${cmd.name}`)
        .addField("Aliases", aliases, true)
        .addField("Cooldown", `${cooldown}`, true)
        .addField(
          "Usage",
          cmd.usage ? `${prefix}${cmd.usage}` : "Not specified",
          true
        )
        .addField("Category", cmd.category, true)
        .addField(
          "Description",
          cmd.description ? cmd.description : "Not specified"
        )
        .addField("Options", options);

      return message.channel.send(embed);
    }
    const commands = bot.commands;

    const utilsCmds = commands
      .filter(({ category }) => category === "util")
      .map(({ name }) => name)
      .join(", ");
    const adminCmds = commands
      .filter(({ category }) => category === "admin")
      .map(({ name }) => name)
      .join(", ");
    const animalCmds = commands
      .filter(({ category }) => category === "animal")
      .map(({ name }) => name)
      .join(", ");

    const imageCmds = commands
      .filter(({ category }) => category === "image")
      .map(({ name }) => name)
      .join(", ");
    const embed = new MessageEmbed()
      .setTimestamp()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .addField("Admin Commands", `\`${adminCmds}\``)
      .addField("Animal Commands", `\`${animalCmds}\``)
      .addField("Image Commands", `\`${imageCmds}\``)
      .addField("Util Commands", `\`${utilsCmds}\``)
      .addField("Server prefix: ", prefix)
      .setDescription(
        `use \`${prefix}help <command name | alias>\` to view more info about a command\n More info can be found using the \`botinfo\` command`
      )
      .setTitle("Help");

    message.channel.send(embed);
  },
};