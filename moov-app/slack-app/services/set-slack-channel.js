const {
    setSlackChannel,
} = require('../repository')

const svc_set_slack_channel = async (customer_id, channel_id) => {
    await setSlackChannel(customer_id, channel_id)
    res.sendStatus(200)
}

module.exports.svc_set_slack_channel = svc_set_slack_channel