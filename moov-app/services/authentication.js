const cryptojs = require('crypto-js')

const webhook_secret = process.env.WEBHOOK_SECRET

module.exports.valid_signature = (headers) => {
    const timeStamp = headers["x-timestamp"]
    const nonce = headers["x-nonce"]
    const webhookID = headers["x-webhook-id"]
    const signature = headers["x-signature"]
    const payload = `${timeStamp}|${nonce}|${webhookID}`
    const checkHash = cryptojs.HmacSHA512(payload, webhook_secret)
    return signature === checkHash.toString()
}
