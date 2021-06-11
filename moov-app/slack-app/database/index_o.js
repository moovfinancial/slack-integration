const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
	user: 'slack_user',
	password: 'Temporal.00',
	database: 'slack_poc_app'
})


async function addInstallation(team_id, installation) {
    console.log('add ins')
    connection.connect()
    const data_slack_team = {
      team_id,
      installation: JSON.stringify(installation)
    }
    const sql_1 = "INSERT INTO slack_team SET ?"
    connection.query(sql_1, data_slack_team, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    })
    const data_slack_user = {
      team_user_id: `${team_id}_${installation.user.id}`,
      installation: JSON.stringify(installation)
    }
    const sql_2 = "INSERT INTO slack_team_user SET ?"
    connection.query(sql_2, data_slack_user, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    })
    connection.end()
}

async function getInstallation(team_id) {
    console.log('get')
    console.log(team_id)
    connection.connect()
    const sql = `SELECT installation FROM slack_team WHERE team_id=?`
    connection.query(sql, team_id, (error, results, fields) => {
      if (error) {
        console.log('error')
        return console.error(error.message);
      }
      console.log('return')
      console.log(JSON.parse(results[0].installation))
      return JSON.parse(results[0].installation)
    })
    connection.end()
}

module.exports.addInstallation = addInstallation
module.exports.getInstallation = getInstallation