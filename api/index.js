const express = require("express");
require('dotenv').config()
const app = express();

app.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    let STUN_SERVERS;
    const servers = async () => await client.tokens.create().then(token => STUN_SERVERS = token.iceServers);
    servers().then((data)=> res.send(data)).catch((err) => res.send(err))
});

app.listen(5000, () => console.log("Server ready on port 3000."));

module.exports = app;