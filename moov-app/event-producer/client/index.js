const {
    Kafka
} = require('kafkajs');
const express = require('express');

const router = express.Router();

const kafka = new Kafka({
    brokers: ['localhost:9092']
})

const producer = kafka.producer();

const sendMessage = async (data) => {
    const temp = await producer.send({
        topic: "transfer-events",
        messages: [{
            value: JSON.stringify(data)
        }, ]
    })
    return temp
}

router.post('/events', (req, res) => {
    const run = async () => {
        await producer.connect();
        result = await sendMessage(req.body);
        res.send('Message sent');
    }
    run().catch(e => console.error(`error ${e.message}`, e))
});

module.exports = router;