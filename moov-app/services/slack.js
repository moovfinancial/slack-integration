const {
    App
} = require('@slack/bolt')


const { get_transfer_data } = require('./moov')
const { message, message_modal } = require('./messages')

const slack_bot_token = process.env.SLACK_TOKEN
const slack_signing_secret = process.env.SLACK_SIGNING_SECRET
const channel = process.env.SLACK_CHANNEL

const app = new App({
    token: slack_bot_token,
    signingSecret: slack_signing_secret
  });

module.exports.send_message = async (transfer_data) => {
    const transfer_info = await get_transfer_data(transfer_data)
    const blocks = message(transfer_data)
    await app.client.chat.postMessage({
        channel,
        blocks
    })
}

module.exports.show_modal = async ({ body, client, ack }) => {
    console.log('ok papa')
    console.log('body')
    console.log(body)
    console.log('value')
    console.log(body.actions[0].value)
    await ack()
    const transfer_data = await get_transfer_data(body.actions[0].value)
    const message = message_modalt(transfer_data)
    await client.views.open({
        trigger_id: body.trigger_id,
        view: message
    })
}