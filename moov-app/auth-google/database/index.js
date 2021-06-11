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


async function addEmailBindingProcess(nonce_slack, email) {

    const connection = await connection_mysql()

    const sql_1 = "UPDATE slack_temp_code SET email = ? WHERE nonce_slack = ?"
    await connection.execute(sql_1, [email, nonce_slack]);
    return true
}

module.exports.addEmailBindingProcess = addEmailBindingProcess