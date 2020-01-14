const express = require('express');
const controllerRouter = require('./controller')
const cors = require('cors')
module.exports = class {
    constructor(port){
        this.app = express();
        this.port = port;
        this.app.use(cors());
        this.app.use("/api",controllerRouter);
      
    }
    
    getApp () {
      return this.app;
    }

    start(){
        this.app.listen(this.port,'0.0.0.0',()=> console.log(`Server started on port ${this.port}`)).on('error', err => console.log(err));
    }
}

