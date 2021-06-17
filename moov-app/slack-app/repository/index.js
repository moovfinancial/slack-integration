const mysql = require('mysql2/promise')

async function connection_mysql() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    return connection
}


async function addInstallation(team_id, installation) {

    try {
        const connection = await connection_mysql()

        const sql_1 = "SELECT installation FROM slack_team WHERE team_id = ?"
        const [rows, fields] = await connection.execute(sql_1, [team_id]);

        if (rows.length == 0) {
            const sql_2 = "INSERT INTO slack_team (team_id, installation) values (?,?)"
            await connection.execute(sql_2, [`${team_id}`, installation])
        }
    } catch(e) {
        console.error(e)
    }

}


async function getInstallation(team_id) {

    try {
        const connection = await connection_mysql()

        const sql_1 = "SELECT installation FROM slack_team WHERE team_id = ?"
        const [rows, fields] = await connection.execute(sql_1, [team_id]);
    
        return rows[0].installation
    } catch(e) {
        console.error(e)
    }

}


async function addBindingProcess(nonce_slack, team_id) {

    try {
        const connection = await connection_mysql()

        const sql_1 = "INSERT INTO slack_temp_code (nonce_slack, team_id) values (?,?)"
        await connection.execute(sql_1, [nonce_slack, team_id]);
    } catch(e) {
        console.error(e)
    }


}


async function getBotToken(customer_id) {

    try {
        const connection = await connection_mysql()

        const sql_1 = "SELECT installation FROM slack_team WHERE customer_id = ?"
        const [rows, fields] = await connection.execute(sql_1, [customer_id]);

        return rows[0].installation.bot.token
    } catch(e) {
        console.error(e)
    }

}


async function setSlackChannel(customer_id, channel_id) {

    try {
        const connection = await connection_mysql()

        const sql_1 = "UPDATE slack_team SET channel_id = ? WHERE customer_id = ?"
        await connection.execute(sql_1, [channel_id, customer_id]);
    } catch(e) {
        console.error(e)
    }
}


async function addSlackState(randomState, installationUrlOptions) {

    try {
        const connection = await connection_mysql()

            const sql_1 = "INSERT INTO slack_state (random_state, installation_url_options) values (?,?)"
            await connection.execute(sql_1, [randomState, installationUrlOptions])

    } catch(e) {
        console.error(e)
    }

}

async function getSlackState(state) {

    try {
        const connection = await connection_mysql()

        const sql_1 = "SELECT installation_url_options FROM slack_state WHERE random_state = ?"
        const [rows, fields] = await connection.execute(sql_1, [state]);

        return rows[0].installation_url_options
    } catch(e) {
        console.error(e)
    }

}


async function getSlackInformation(customer_id) {

    try {
        const connection = await connection_mysql()

        const sql_1 = "SELECT installation, channel_id FROM slack_team WHERE customer_id = ?"
        const [rows, fields] = await connection.execute(sql_1, [customer_id]);
        const slack_information = {
            bot_token: rows[0].installation.bot.token,
            channel_id: rows[0].channel_id
        }
        return slack_information
    } catch(e) {
        console.error(e)
    }

}


module.exports.addInstallation = addInstallation
module.exports.getInstallation = getInstallation
module.exports.addBindingProcess = addBindingProcess
module.exports.getBotToken = getBotToken
module.exports.setSlackChannel = setSlackChannel
module.exports.addSlackState = addSlackState
module.exports.getSlackState = getSlackState
module.exports.getSlackInformation = getSlackInformation