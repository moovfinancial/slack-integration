require('dotenv').config()
const {
    App,
    ExpressReceiver,
    LogLevel
} = require('@slack/bolt')
const express = require('express')

const { list_slack_channels } = require('./controllers/list-slack-channels')
const { set_slack_channel } = require('./controllers/set-slack-channel')
const { callback } = require('./controllers/callback')
const { authentication } = require('./services/authentication')
const run = require('./services/events-consumer')

const config = require('./config')

const receiver = new ExpressReceiver(config);
const app = new App({
    receiver,
    logLevel: LogLevel.DEBUG
})

receiver.router.use(express.json())
receiver.router.use(express.urlencoded({
    extended: true
}))
receiver.router.post('/callback', callback);
receiver.router.post('/list-slack-channels', list_slack_channels);
receiver.router.post('/set-slack-channel', set_slack_channel);


app.message('hello', async ({
    message,
    say
}) => {
    await say(`Hey there <@${message.user}>!`);
});


app.event('app_uninstalled', async ({
    event,
    client
}) => {
    try {
        console.log('event_uninstalled')
        console.log(event)
        // console.log('new channel')
        // const channel_name = event.channel.name
        // console.log(channel_name)
        // if (channel_name.startsWith('z-')) {
        //     const app2 = new App({
        //         token: process.env.SLACK_USER_TOKEN,
        //         signingSecret: process.env.SLACK_SIGNING_SECRET,
        //     })
        //     // customer
        //     await app2.client.conversations.invite({
        //         channel: event.channel.id,
        //         users: 'U024EKBFZB5'
        //     })
        //     // personal
        //     // await app2.client.conversations.invite({
        //     //     channel: event.channel.id,
        //     //     users: 'U02444R7JSF'
        //     // })
        //     console.log('bot added')
        // }
    } catch (error) {
        console.log('error channel_created')
        console.error(error);
    }
});


app.event('tokens_revoked', async ({
    event,
    client
}) => {
    try {
        console.log('tokens_revoked')
        console.log(event)
        // console.log('new channel')
        // const channel_name = event.channel.name
        // console.log(channel_name)
        // if (channel_name.startsWith('z-')) {
        //     const app2 = new App({
        //         token: process.env.SLACK_USER_TOKEN,
        //         signingSecret: process.env.SLACK_SIGNING_SECRET,
        //     })
        //     // customer
        //     await app2.client.conversations.invite({
        //         channel: event.channel.id,
        //         users: 'U024EKBFZB5'
        //     })
        //     // personal
        //     // await app2.client.conversations.invite({
        //     //     channel: event.channel.id,
        //     //     users: 'U02444R7JSF'
        //     // })
        //     console.log('bot added')
        // }
    } catch (error) {
        console.log('error channel_created')
        console.error(error);
    }
});


app.command('/moov', authentication);


app.error((error) => {
    console.log('global error')
    console.error(error);
});


app.action('login_button', ({
    body,
    ack,
    say
}) => {
    ack();
});


(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})()

run().then(() => console.log("Done"), err => console.log(err));