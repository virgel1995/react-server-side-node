/*const {setServerPrefix,
  getServerPrefix,
  sendToDev,
} = require("../utils/functions.js");*/
const GuildConf = require('../../Database/schemas/Guild.js');
const UserConf = require('../../Database/schemas/User.js');
const { version, MessageEmbed } = require('discord.js');
const ms = require("ms")
const moment = require("moment")
const { owners } = require('../../config.json');
//const serverPrefix = "!";
module.exports = {
	name: 'message',
	async execute(bot, message) {
		if (message.channel.type === 'dm') return;
		const guildId = message.guild.id;
		const userId = message.author.id;
		const cooldowns = bot.cooldowns;

		//get Guild from database
		const guildConf = await GuildConf.findOne({
			guildId: guildId
		});
		if (!guildConf)
			await GuildConf.create({
				guildId: guildId
			});
		const userConfig = await UserConf.findOne({
			discordId: userId
		});
		if (!userConfig)
			await UserConf.create({
				discordId: userId
			});
//languages soon 
    
let language = guildConf.language
if (!language) language = "en";
const lang = require(`../../lang/bot/${language}`+'.js');

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
const serverPrefix = guildConf.prefix;
    if(!serverPrefix) {
          await GuildConf.findOneAndUpdate({ guildId: message.guild.id },
      { prefix: '!' },
      { new: true })
}


    
    //* Change using !prefix <new prefix>
		const prefix = new RegExp(
			`^(<@!?${bot.user.id}>|${escapeRegex(serverPrefix)})\\s*`
		);


                // xp system 
/*
                const calculateUserXp = (xp) => Math.floor(0.1 * Math.sqrt(xp));
                if (!message.author.bot) {
                        const xp = Math.ceil(Math.random() * (5 * 10));
                        const level = calculateUserXp(userConfig.globalXp);
                        const newLevel = calculateUserXp(userConfig.globalXp + xp);
                        if (newLevel > level) {

                                await UserConf.findOneAndUpdate({
                                        discordId: user.id,
                                }, { coins: userConfig.coins + 200 }, { new: true })
                                const embed = new MessageEmbed()
                                        .setTitle(lang.messageEvent.levltitle)
                                        .addField(lang.messageEvent.f1, newLevel)
                                        .addField(lang.messageEvent.f2, userConfig.globalXp)
                                        .setDescription(lang.messageEvent.levldesc + userConfig.coins)
                                        .setFooter(user.username)
                                const msg = await message.channel.send(embed);
                                setTimeout(() => {
                                        msg.delete();
                                }, 10000);




                        }
                        await UserConf.findOneAndUpdate({
                                discordId: user.id,
                        }, { globalXp: userConfig.globalxp + xp }, { new: true })
                }
*/





    
		// Commands
		if (
			!prefix.test(message.content) ||
			message.author.bot ||
			userId === bot.user.id
		)
			return;

		const [, matchedPrefix] = message.content.match(prefix);
		const args = message.content
			.slice(matchedPrefix.length)
			.trim()
			.split(/ +/);
		const command = args.shift().toLowerCase();

 if (message.mentions.has(bot.user.id) && !command) {
                        const uptime = ms(bot.uptime);
                        const nodev = process.version;
                        const createdAt = moment(bot.user.createdAt).format("MM/DD/YYYY");
                        const serverCount = bot.guilds.cache.size;
                        const embed = new MessageEmbed()
                                .setTitle("<:BOT:803656383839862834>" + lang.messageEvent.quicktitle)
                                .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
                                .addField(lang.messageEvent.quicksprefix, guildConf.prefix)
                                .addField(lang.messageEvent.quickbotid, bot.user.id)
                                .addField(lang.messageEvent.quickbotusername, bot.user.username)
                                .addField(lang.messageEvent.quickbotinfo, `
  ${lang.messageEvent.quickusers} ${bot.users.cache.size}
  ${lang.messageEvent.quickservers} ${serverCount}
  ${lang.messageEvent.quickcreatedon} 1/1/2021`)
                                .addField(lang.messageEvent.quicksysteminfo,
                                        `${lang.messageEvent.quickram}  ${(process.memoryUsage().heapUsed /
                                                1024 / 1024).toFixed(2)}MB
  ${lang.messageEvent.quickbotuptime} ${uptime}
  ${lang.messageEvent.quickdjsv} ${version}
  ${lang.messageEvent.quicknodev} ${nodev}
  ${lang.messageEvent.quickbotping} ${Math.round(bot.ws.ping)}ms`)
                                .addField(lang.messageEvent.quicksupport, "https://discord.gg/wcM7ymtYTA", true)
                                //.addField("Vote Us", "Soon"
                                .addField("Servers : ", `${serverCount}`)
                                // .addField("**Permissions**", memberPermissions) 
                                .setColor('#0099ff');
                        message.channel.send(embed);
                }

    
		/*if (message.mentions.has(bot.user.id) && !command) {
			const embed = new MessageEmbed()
				.setTitle('Quick Info')
				.addField('Prefix', serverPrefix)
				.addField('Support', 'https://discord.gg')
				.addField('Vote on top.gg', 'Soon')
				.setColor('BLUE');

			message.channel.send(embed);
		}
    */
		try {
			const cmd =
				bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));

			cmd.execute(bot, message, args);
       //bot mention 
 //if (message.content.startsWith(`<@!${bot.user.id}>`) && !cmd)

		} catch (e) {
			//sendToDev(message, bot, e);
			console.log(e);
		}
	}
};
