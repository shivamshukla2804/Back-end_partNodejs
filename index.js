// init code
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
// const router = require('express').Router();
const port = process.env.PORT;
// const database = require('./database');

const userController = require('./controllers/user');
const message = require('./controllers/message');
//middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use('/api/user' , userController);

app.use('/api/user/message' , message);

//error handler
app.use((req,res,next)=> {
    const error = new error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=> {
    res.status(error.status || 500),
    res.json({
        error:{
            message: error.message
        }
    })
})








//default routes
app.all(
    '/',
    function(req,res){
        return res.json({
            status : true,
            message: "Hi i am working fine from index.."
        });
    }
);

app.listen(
    port,
    function(){
        console.log('server is renning fine'+port);
    }
)
// module.exports = router;