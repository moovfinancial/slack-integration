const { svc_set_slack_channel } = require('../services/set-slack-channel')

const set_slack_channel = async (req, res) => {
    await svc_set_slack_channel(req.body.customer_id, req.body.channel_id)
    res.sendStatus(200)
}

module.exports.set_slack_channel = set_slack_channel