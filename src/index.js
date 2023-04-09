const express = require('express');

const app = express();
const {PORT} = require('./config/ServerConfig');

const ApiRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const db = require('./models/index');

const {User,Role} = require('./models/index');

 const startServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',ApiRoutes);
    app.listen(PORT,async () => {
        console.log(`Server Started on ${PORT}`)
        // if(process.env.DB_SYNC)
        // {
        //     db.sequelize.sync({alter:true});
        // }

         //const u1 = await User.findByPk(8);
         //const r1 = await Role.findByPk(2);
         //u1.addRoles(r1);//this and below works same
        //r1.addUsers(u1);
        // console.log(u1,r1);

    })
}

startServer();
