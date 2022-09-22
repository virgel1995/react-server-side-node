
const GuildConfig = require("../../../Database/schemas/Guild.js");

const { owners } = require("../../../config.json");

module.exports = {
  name: "prefix",
  description: "Set a prefix for your server",
  category: "admin",
  async execute(bot, message, args) {

    const Guild = await GuildConfig.findOne({ guildId: message.guild.id })
    const prefix = Guild.prefix
    const new_prefix = args[0]
if(!new_prefix) return message.reply("please type correct prefix")
    if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.reply("you didn't have permissions")
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you didn't have permissions")
    if (prefix === new_prefix) return message.reply("did you need change it to same prefix ?!")
    await GuildConfig.findOneAndUpdate({ guildId: message.guild.id },
      { prefix: new_prefix },
      { new: true })
      message.channel.send("successfully changed prefix to " + " ` "+ new_prefix + "`")


  },
};



///////
