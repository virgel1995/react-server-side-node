//* this file is for creating small mostly database related functions to keep stuff clean in the command files.
//! If you are contributing, please use this file for db functions


const fs = require('fs');
const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const { owners } = require("../../config.json");



const formatDate = (date) => moment(date).format("MM/DD/YYYY");

const toCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);


const getServerPrefix = (guildId,prefix) => {
}

const setServerPrefix = (guildId, newPrefix) =>{
}
const sendToDev = (message, bot, error) => {
  const errorEmbed = new MessageEmbed()
    .setTitle("Whoops! That wasn't supposed to happen!")
    .setDescription(`Send error to developer? y/n \n \`\`\` ${error} \`\`\` `)
    .setColor("RED")
    .setFooter(message.author.username)
    .setTimestamp();

  message.channel.send(errorEmbed);

  const filter = (m) => message.author.id === m.author.id;

  message.channel
    .awaitMessages(filter, { time: 600000, max: 1, errors: ["time"] })
    .then((messages) => {
      const msg = messages.first();
      if (msg.content === "y") {
        bot.users.cache.get(ownerId).send(
          `**New Error!** 
**Server ID:** ${message.guild.id}
**Error:** \`\`\`${error} \`\`\` `
        );
        msg.react("👍");
      } else {
        return console.log(error);
      }
    });
};
const errorEmbed = (error, message) => {
  return new MessageEmbed()
    .setTitle("Woah!")
    .setDescription(`❌ I don't have the correct permissions to ${error}`)
    .setColor("ORANGE")
    .setFooter(message.author.username)
    .setTimestamp();
};


module.exports = {
  //getServerPrefix,
  //setServerPrefix,
  formatDate,
  toCapitalize,
  sendToDev,
  errorEmbed
};
