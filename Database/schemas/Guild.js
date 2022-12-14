const mongoose = require("mongoose")

const guildSchemas = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        required: true,
        default: "!",
    },
    blacklistedwords: {
        type: Array,
        default: []
    },
    disabled_commands: {
        type: Array,
        default: []
    },
    disabled_categories: {
        type: Array,
        default: []
    },
    announcement_channel: {
        type: String
    },
    suggest_channel: {
        type: String
    },
    defaultRole: {
        type: String,
    },
    memberLogChannel: {
        type: String,
    },
    logChannel: {
        type: String,
    },
    welcomeMessage: {
        type: String,
        default: "-member- ππ΄π»π²πΎπΌπ΄ ππΎ ππ΄πππ΄π -guild- \nππ΄ ππΈππ· ππΎπ ππ·π΄ π±π΄ππ ππΈπΌπ΄π"
    },
    goodByeMessage: {
        type: String,
        default: "-member- Leaved from -guild-"
    },
    welcomeBg: {
        type: String,
        default: "https://cdn.discordapp.com/attachments/778133840408346665/799272610142748723/unknown.jpeg"
    },
    language: {
        type: String,
        default: "en"
    },
    bumpChannelServers: {
        type: String,
    },
    bumpIconServers: {
        type: String,
        default: "https://media.discordapp.net/attachments/799988437557313597/832524368914677790/250000.png?width=946&height=473"
    },
    bumpChannelBots: {
        type: String,
    },
    bumpServerDescription: {
        type: String,
        default: "amazing server just join to have fun with us β€οΈ",
    },
    bumpServerInviteurl: {
        type: String,
    },
})
module.exports = mongoose.model("Guild", guildSchemas)
