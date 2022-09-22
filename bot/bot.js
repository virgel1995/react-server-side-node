require("dotenv").config();
require("../Database/Database.js")
const {
  Collection,
  Client
} = require("discord.js");
const bot = new Client({
  disableMentions: "all",
  fetchAllMembers: true,
  ws: {
    properties: {
      $browser: "Discord iOS"
    }
  },
  partials: ["MESSAGE", "USER", "REACTION"],
});

bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
//to loop all commands and events files 
//commands
require("./utils/command.js")(bot);
// events
require("./utils/events.js")(bot);
//
bot.login(process.env.token);

