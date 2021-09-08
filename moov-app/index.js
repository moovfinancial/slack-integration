require('dotenv').config()
const express = require('express')
const { App, ExpressReceiver } = require('@slack/bolt');

const slack = require('./controllers/slack')
const { show_modal } = require('./services/slack')

const slack_signing_secret = process.env.SLACK_SIGNING_SECRET
const slack_bot_token = process.env.SLACK_TOKEN

const receiver = new ExpressReceiver({ signingSecret: slack_signing_secret });
const app = new App({
  token: slack_bot_token,
  receiver
});

app.action('show_transfer_data', show_modal)

receiver.router.use(express.json())
receiver.router.use(express.urlencoded({
    extended: true
}))
receiver.router.post('/webhook/slack', slack);

(async () => {
  await app.start(8080);
  console.log('app is running');
})();