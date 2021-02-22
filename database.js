//init code
require('dotenv').config();
const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.DB_URL;

//connection code
mongoose.connect(
    db_url,
    {
        useNewUrlParser : true,
        useUnifiedToplogy : true,
        useCreateIndex : true
    },
    function(error,link){
            //check error
            assert.equal(error, null,"DB is not connected..:(");

            //else
            console.log("DB connect successfully :)");
            // console.log(link);
    }
);