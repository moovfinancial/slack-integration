const {
    Issuer,
    generators
} = require('openid-client');
const { addEmailBindingProcess } = require('../database')

const url_idp = process.env.URL_IDP
const callback_url = process.env.CALLBACK_URL
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

async function openid_client() {
    const issuer = await Issuer.discover(url_idp);
    const client = new issuer.Client({
        client_id,
        client_secret,
        redirect_uris: [callback_url],
        response_types: ['code'],
    })
    return client
}

async function login (req, res) {
    const code_verifier = generators.codeVerifier();
    const code_challenge = generators.codeChallenge(code_verifier)
    const nonce = generators.nonce()
    req.session.code_verifier = code_verifier
    req.session.nonce = nonce
    req.session.nonce_slack = req.query.nonce_slack
    const client = await openid_client()
    const login_url = client.authorizationUrl({
        scope: 'openid email profile',
        code_challenge,
        code_challenge_method: 'S256',
        nonce
    })
    res.redirect(login_url)
}

async function callback (req, res) {
    const code_verifier = req.session.code_verifier
    const nonce = req.session.nonce
    const nonce_slack = req.session.nonce_slack
    const client = await openid_client()
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(callback_url, params, {
        code_verifier,
        nonce
    })
    const access_token = tokenSet.access_token
    const user_info = await client.userinfo(access_token)
    // const temp = {
    //     tokenSet,
    //     user_info,
    //     tokenSetClaims: tokenSet.claims()
    // }
    // res.send(temp)
    await addEmailBindingProcess(nonce_slack, user_info.email)
    url_action = process.env.URL_ACTION
    res.render("form", {
        url_action,
        nonce_slack
    })
}

module.exports.login = login
module.exports.callback = callback