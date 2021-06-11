const admin = require('firebase-admin');

const serviceAccount = require('./database.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })

async function addInstallation(team_id, installation) {
    const docRefA = db.collection('installations').doc(`${team_id}`)
    await docRefA.set({
      ...installation
    })
    const docRefB = db.collection('installations_users').doc(`${team_id}_${installation.user.id}`)
    await docRefB.set({
      ...installation
    })
}

async function getInstallation(team_id) {
    const docRefA = db.collection('installations').doc(`${team_id}`)
    const doc = await docRefA.get()
    if (!doc.exists) {
      console.log('No such document!')
    } else {
      return doc.data()
    }
    
}

module.exports.addInstallation = addInstallation
module.exports.getInstallation = getInstallation