const {
    Kafka
} = require("kafkajs");
const {
    App
} = require('@slack/bolt')
const {
    getSlackInformation
} = require('../repository')

module.exports = async function run() {
    const kafka = new Kafka({
        brokers: [process.env.BROKERS]
    });
    const consumer = kafka.consumer({
        groupId: "" + Date.now()
    });

    await consumer.connect();

    await consumer.subscribe({
        topic: "transfer-events",
        fromBeginning: false
    });
    await consumer.run({
        eachMessage: async (data) => {
            const transfer_event = JSON.parse(data.message.value.toString("utf8"))
            const { bot_token, channel_id } = await getSlackInformation(transfer_event.customer_id)
            const app = new App({
                token: bot_token,
                signingSecret: process.env.SLACK_SIGNING_SECRET,
            })
            let msg = ''
            if (transfer_event.status === 'failed') {
                msg = ':x: Transaction Failure! Sign-in to your Moov account dashboard for more information.'
            } else if (transfer_event.status === 'processed') {
                const date = new Date(transfer_event.created_at * 1000);
                msg = `*Transfer:* ${transfer_event.transfer_id} :white_check_mark:\n*Created:* ${date} :timer_clock:\n*Transaction amount:* ${transfer_event.amount} :dollar:`
            }
            await app.client.chat.postMessage({ channel: channel_id, text: msg })
        }
    });
}