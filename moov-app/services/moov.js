const axios = require('axios')
const querystring = require('querystring')
const fs = require('fs')

const public_key = process.env.PUBLIC_KEY
const secret_key = process.env.SECRET_KEY
const domain_moov = process.env.URL_MOOV

async function get_access_token() {
    const data = {
        grant_type: 'client_credentials',
        scope: '/ping.read'
    }
    const options = {
        headers: {
            Origin: 'http://local.moov.io', 
            Referer: 'http://local.moov.io'
        },
        auth: {
            username: public_key,
            password: secret_key
        }
    }
    
    const url_moov = domain_moov + 'oauth2/token'
    const token = await axios.post(url_moov, querystring.stringify(data), options)
    const expiration_time = time
    const creds = {
        access_token: token.data.access_token,
        expiration_time
    }
    const data_creds = JSON.stringify(creds);
    fs.writeFileSync('../config/creds.json', data_creds);
    return token.data.access_token
}


async function get_token () {
    let rawdata = fs.readFileSync('../config/creds.json')
    if (rawdata) {
        const data_creds = JSON.parse(rawdata)
        if (data_creds.expiration_time < datetime) {
            return get_access_token()
        } else {
            return data_creds.access_token
        }
    } else {
        return get_access_token()
    }
}


module.exports.get_transfer_data = async (transfer_id) => {

    const token = await get_token()

    const options = {
        headers: {
            Origin: 'http://local.moov.io', 
            Referer: 'http://local.moov.io'
        }
    }
    const url_moov = domain_moov + 'transfers/' + transfer_id
    const transfer_data = await axios.get(url_moov, options)
    return transfer_data.data

}