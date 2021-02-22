//init code
const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const {check, validationResult}= require('express-validator');
const User = require('./../models/user');

//middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//routes goes here
router.all(
    '/',
    function (req,res) {
        return res.json({
            status: true,
            message: 'user controller working fine ...:)'
        });
    }
);

//create new user route
router.post(
    '/createNew',
    [
        //check not empty
        check('username').not().isEmpty().trim().escape(),
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail()
        
    ],
    function(req,res){
        //chech validation error
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({
                status: false,
                message: 'Form validation error',
                errors: errors.array()
            });
        }
        //hash password code
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // create new use model
    var temp = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      });
  
      // insert data into database
      temp.save(function (error, result) {
        // check error
        if (error) {
          return res.json({
            status: false,
            message: 'DB Insert Fail...',
            error: error
          });
        }
            //Everythng ok
            return res.json({
                status: true,
                message: 'DB Insert Success..',
                result: result
            });
            
        });

    }
);

//find method
router.get(
    '/find',
    function (req, res) {

        User.find(function (error, result) {

            if (error) {
                return res.json({
                    status: false,
                    message: 'DB Find Fail...',
                    error: error
                });
            }

            return res.json({
                status: true,
                message: 'DB Find Success...',
                result: result
            });
        });
    }
);

// login router for user
router.post(
    '/login',
    [
        // check not empty fields
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail()
    ],
    function (req, res) {
        // check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                message: 'Form validation error.',
                errors: errors.array()
            });
        }


        User.findOne(
            { email: req.body.email },
            function (error, result) {

                if (error) {
                    return res.json({
                        status: false,
                        message: 'DB Read Fail...',
                        error: error
                    });
                }


                if (result) {

                    const isMatch = bcrypt.compareSync(req.body.password, result.password);


                    if (isMatch) {

                        return res.json({
                            status: true,
                            message: 'User exists. Login Success...',
                            result: result
                        });
                    } else {

                        return res.json({
                            status: false,
                            message: 'Password not matched. Login Fail...',
                        });
                    }
                } else {

                    return res.json({
                        status: false,
                        message: 'User don\'t exists.'
                    });
                }

            }
        );
    }
);

//module exports
module.exports = router;




