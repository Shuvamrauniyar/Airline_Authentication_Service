const express = require('express');

const app = express();
const {PORT} = require('./config/ServerConfig');

const startServer = () => {
    app.listen(PORT,() => {
        console.log(`Server Started on ${PORT}`)
    })
}

startServer();
