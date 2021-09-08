const { valid_signature } = require('../services/authentication')
const { get_transfer_data } = require('../services/moov')
const { send_message } = require('../services/slack')

module.exports = async (req, res) => {
    console.log('body')
    console.log(req.body)
    const check_signature = valid_signature(req.headers)
    if (check_signature) {
        console.log('process ok')
        const transfer_id = '11111111'
        const transfer_data = await get_transfer_data(transfer_id)
        await send_message(transfer_data)
    } else {
        console.log('The event didnt come from Moov.')
    }
  res.sendStatus(200)
}
