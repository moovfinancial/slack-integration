const {
    Kafka
} = require("kafkajs");

run().then(() => console.log("Done"), err => console.log(err));

async function run() {
    const kafka = new Kafka({
        brokers: ["localhost:9092"]
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
            // console.log(data);
            // console.log(data.message.value.toString("utf8"));
            const transfer_event = JSON.parse(data.message.value.toString("utf8"))
            console.log(transfer_event)
        }
    });
}