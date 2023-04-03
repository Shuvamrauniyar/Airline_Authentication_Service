const express = require('express');

const app = express();
const {PORT} = require('./config/ServerConfig');

const ApiRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const startServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',ApiRoutes);
    app.listen(PORT,() => {
        console.log(`Server Started on ${PORT}`)
    })
}

startServer();
