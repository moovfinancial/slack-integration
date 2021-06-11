const mysql = require('mysql2/promise')

async function connection_mysql() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'slack_user',
        password: 'Temporal.00',
        database: 'slack_poc_app'
    })
    return connection
}


async function addInstallation(team_id, installation) {

    const connection = await connection_mysql()

    const sql_1 = "INSERT INTO slack_team (team_id, installation) values (?,?)"
    await connection.execute(sql_1, [team_id, installation]);

    const sql_2 = "INSERT INTO slack_team_user (team_user_id, installation) values (?,?)"
    await connection.execute(sql_2, [`${team_id}_${installation.user.id}`, installation])
}


async function getInstallation(team_id) {

    const connection = await connection_mysql()

    const sql_1 = "SELECT installation FROM slack_team WHERE team_id = ?"
    const [rows, fields] = await connection.execute(sql_1, [team_id]);

    return rows[0].installation
}


async function addBindingProcess(nonce_slack, team_user_id) {

    const connection = await connection_mysql()

    const sql_1 = "INSERT INTO slack_temp_code (nonce_slack, team_user_id) values (?,?)"
    await connection.execute(sql_1, [nonce_slack, team_user_id]);

}

module.exports.addInstallation = addInstallation
module.exports.getInstallation = getInstallation
module.exports.addBindingProcess = addBindingProcess