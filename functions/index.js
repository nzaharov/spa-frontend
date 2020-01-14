const functions = require("firebase-functions")
const Server = require("./src/server")

const app1 = new Server(8000); // port is useless here

const api1 = functions.https.onRequest(app1.getApp());

module.exports = {
    api1
}
