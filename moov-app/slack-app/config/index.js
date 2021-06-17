const {
    App
} = require('@slack/bolt')
const {
    addInstallation,
    getInstallation,
    addSlackState,
    getSlackState
} = require('../repository')
const {
    nanoid
} = require('nanoid')

module.exports = {
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    scopes: ['channels:history', 'channels:read', 'chat:write', 'chat:write.public', 'commands', 'groups:history', 'groups:write', 'im:history', 'mpim:history', 'groups:read', 'im:read', 'mpim:read'],
    installerOptions: {
        userScopes: ['channels:read', 'groups:read', 'im:read', 'mpim:read'],
        // metadata: 'some session data',
        callbackOptions: {
            success: async (installation, installOptions, req, res) => {
                const app2 = new App({
                    token: installation.bot.token,
                    signingSecret: process.env.SLACK_SIGNING_SECRET,
                })
                const user_id = installation.user.id
                await app2.client.chat.postMessage({
                    channel: user_id,
                    text: "Welcome! You’re almost ready to start receiving Moov payment details in Slack. :wave:"
                })
                res.send('successful!')
            },
            failure: (error, installOptions, req, res) => {
                res.send('failure')
            }
        },
        stateStore: {
            generateStateParam: async (installUrlOptions, date) => {
                const randomState = nanoid(60)
                await addSlackState(randomState, installUrlOptions)
                return randomState
            },
            verifyStateParam: async (date, state) => {
                return await getSlackState(state)
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
    }
}