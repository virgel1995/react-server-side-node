module.exports = {
  name: "ready",
  execute(bot) {
    const serverCount = bot.guilds.cache.size;
    const userCount = bot.users.cache.filter((u) => !u.bot).size;
    const channelCount = bot.channels.cache.size;
    const statuses = [
      `servers : [${serverCount}]`,
      "Mention Me For help",
      "Devlopment By: virus24#3226",
      ` users : [${userCount}]`,
    ];
    // `${channelCount} channels`,
    console.log(
      `[BOT]: Bot is running with ${channelCount} channels,  ${userCount} users and ${serverCount} servers`
    );
    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, {
        type: "STREAMING",
        URL: "https://www.youtube.com/channel/UCJRFxBrnUSY-xDLBvvWXtOQ"
      });
    }, 4000);
  },
};

    