const express = require('express');
const cors = require ('cors');


class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT || 3000;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(require('../routes/user'));
        this.app.use(require('../routes/service'));
        this.app.use(require('../routes/category'));
        this.app.use(require('../routes/turn'));
    }

    start(){
        this.app.listen(process.env.PORT || 3000,()=>{
            console.log('Servidor levantado en : ',this.port);
        });
    }
}


module.exports=Server;