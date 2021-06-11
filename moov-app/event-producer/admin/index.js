const {Kafka} = require('kafkajs');
const express = require('express');

const router = express.Router();

const kafka = new Kafka({
  brokers: ['localhost:9092']
})

const admin = kafka.admin();

router.post('/create-topic', (req, res) => {
  //create topic object with basic settings of number of partitions nd replication factor count.
  const topic = {
    topic:req.body.topicName
  }

  const run = async () => {
    await admin.connect();
    //use createTopic API and pass topic object
    let topicCreated = await admin.createTopics({
      waitForLeaders: true,
      topics:[topic]
    });
    console.log('topicCreated: ', topicCreated);
    if(topicCreated){
      res.status(200).send('Topic:'+  req.body.topicName+' created');
      await admin.disconnect();

    }else{
      res.status(200).send('Topic:'+  req.body.topicName+' creation failed' + topicCreated);
    }
  }
  run().catch(console.error);
});


module.exports = router;