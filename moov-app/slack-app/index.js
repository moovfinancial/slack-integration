require('dotenv').config()
const {
    App,
    ExpressReceiver,
    LogLevel
} = require('@slack/bolt')
const {
    nanoid
} = require('nanoid')
const {
    addInstallation,
    getInstallation,
    addBindingProcess
} = require('./database/index')
const express = require('express')

const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: process.env.SECRET,
    scopes: ['channels:history', 'channels:read', 'chat:write', 'chat:write.public', 'commands', 'groups:history', 'groups:write', 'im:history', 'mpim:history', 'groups:read', 'im:read', 'mpim:read'],
    installerOptions: {
        userScopes: ['channels:read', 'groups:read', 'im:read', 'mpim:read'],
        callbackOptions: {
            success: async (installation, installOptions, req, res) => {
              const app2 = new App({
                token: installation.bot.token,
                signingSecret: process.env.SLACK_SIGNING_SECRET,
              })
              const user_id = installation.user.id
              await app2.client.chat.postMessage({
                  channel: user_id,
                  text: "Welcome! You’re almost ready to start receiving Moov payment details in Slack."                        
              })
              res.send('successful!');
            }, 
            failure: (error, installOptions , req, res) => {
              // Do custom failure logic here
              res.send('failure');
            }
          }
    },
    installationStore: {
        storeInstallation: (installation) => {
            if (installation.isEnterpriseInstall) {
                return addInstallation(installation.enterprise.id, installation)
            } else {
                return addInstallation(installation.team.id, installation)
            }
            throw new Error('Failed saving installation data to installationStore');
        },
        fetchInstallation: (installQuery) => {
            if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
                return getInstallation(installQuery.enterpriseId)
            }
            if (installQuery.teamId !== undefined) {
                return getInstallation(installQuery.teamId);
            }
            throw new Error('Failed fetching installation')
        }
    },
    logLevel: LogLevel.DEBUG
});

receiver.router.use(express.urlencoded({
    extended: true
}))

const app = new App({
    receiver,
    logLevel: LogLevel.DEBUG
})


app.message('hello', async ({
    message,
    say
}) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hey there <@${message.user}>!`);
});


app.command('/moov', async ({
    command,
    ack,
    say
}) => {
    try {
        console.log(command)
        await ack();
        if (command.text == 'auth') {
            const nonce_slack = nanoid(60)
            await addBindingProcess(nonce_slack, `${command.team_id}`)
            const response = {
                "blocks": [{
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": ":bust_in_silhouette: Let’s link your Moov account so we can get started!"
                        }
                    },
                    {
                        "type": "actions",
                        "block_id": "actionblock789",
                        "elements": [{
                            "type": "button",
                            "action_id": "foo",
                            "text": {
                                "type": "plain_text",
                                "text": "Log In"
                            },
                            "style": "primary",
                            "value": "click_me_456",
                            "url": "http://localhost:8000/login?nonce_slack=" + nonce_slack
                        }]
                    }
                ]
            }
            await say(response);
        } else {
            await say('Not command found');
        }
    } catch (error) {
        console.log('local error')
        console.error(error)
    }
});

receiver.router.post('/callback', (req, res) => {
    // You're working with an express req and res now.
    console.log('body')
    console.log(req.body)
    console.log('nonce_slack')
    console.log(req.body.nonce_slack)
    res.send('yay! you are authenticated')
});

app.error((error) => {
    // Check the details of the error to handle cases where you should retry sending a message or stop the app
    console.log('global error')
    console.error(error);
});

app.action('foo', ({
    body,
    ack,
    say
}) => {
    // Acknowledge the action
    ack();
    // say(`<@${body.user.id}> clicked the button`);
});

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();