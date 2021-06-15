require('dotenv').config()
const {
    Kafka
} = require("kafkajs");
const { WebClient } = require('@slack/web-api');
const {
    getSlackInformation
} = require('./database/index')

run().then(() => console.log("Done"), err => console.log(err));

async function run() {
    const kafka = new Kafka({
        brokers: [process.env.BROKERS]
    });
    // If you specify the same group id and run this process multiple times, KafkaJS
    // won't get the events. That's because Kafka assumes that, if you specify a
    // group id, a consumer in that group id should only read each message at most once.
    const consumer = kafka.consumer({
        groupId: "" + Date.now()
    });

    await consumer.connect();

    await consumer.subscribe({
        topic: "transfer-events",
        fromBeginning: true
    });
    await consumer.run({
        eachMessage: async (data) => {
            const transfer_event = JSON.parse(data.message.value.toString("utf8"))
            const { bot_token, channel_id } = await getSlackInformation(transfer_event.customer_id)
            const web = new WebClient(bot_token);
            let msg = ''
            if (transfer_event.status === 'failed') {
                msg = ':x: Transaction Failure! Sign-in to your Moov account dashboard for more information.'
            } else if (transfer_event.status === 'processed') {
                const date = new Date(transfer_event.created_at * 1000);
                msg = `*Transfer:* ${transfer_event.transfer_id} :white_check_mark:\n*Created:* ${date} :timer_clock:\n*Transaction amount:* ${transfer_event.amount} :dollar:`
            }
            await web.chat.postMessage({ channel: channel_id, text: msg })
        }
    });
}