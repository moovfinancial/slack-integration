const {
    nanoid
} = require('nanoid')
const {
    addBindingProcess
} = require('../repository')


const authentication = async ({
    command,
    ack,
    say
}) => {
    try {
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
                            "action_id": "login_button",
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
            await say('Not command found, try again');
        }
    } catch (error) {
        console.log('local error')
        console.error(error)
    }
}

module.exports.authentication = authentication