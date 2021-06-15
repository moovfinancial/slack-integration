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


module.exports.getSlackInformation = getSlackInformation