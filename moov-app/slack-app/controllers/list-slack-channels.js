const { svc_list_slack_channels } = require('../services/list-slack-channels')

const list_slack_channels = async (req, res) => {
    const channels = await svc_list_slack_channels(req.body.customer_id)
    res.send(channels)
}

module.exports.list_slack_channels = list_slack_channels