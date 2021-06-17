const callback = async (req, res) => {
        console.log('body')
        console.log(req.body)
        console.log('nonce_slack')
        console.log(req.body.nonce_slack)
        res.send('yay! you are authenticated')
    }

module.exports.callback= callback