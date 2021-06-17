const {
    App
} = require('@slack/bolt')
const {
    getBotToken,
} = require('../repository')

const svc_list_slack_channels = async (customer_id) => {
    const botToken = await getBotToken(customer_id)
    const app = new App({
        token: botToken,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
    })
    const slack_channels = await app.client.conversations.list({
        exclude_archived: true,
        types: 'public_channel,private_channel'
    })
    const channels = []
    for (const channel of slack_channels.channels) {
        channels.push({
            channel_id: channel.id,
            channel_name: channel.name
        })
    }
    return channels
}

module.exports.svc_list_slack_channels = svc_list_slack_channels