const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const {check, validationResult}= require('express-validator');
const User = require('./../models/user');
const Meeting = require('../models/Meeting');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.all(
    '/',
    function (req,res) {
        return res.json({
            status: true,
            message: 'Meeting controller working fine ...:)'
        });
    }
);

router.post(
    '/meeting',
    [
      //check not empty
      check('name').not().isEmpty().trim().escape(),
      check('meetingName').not().isEmpty().trim().escape(),
      check('meetingId').not().isEmpty().trim().escape(),
      check('meetingPassword').not().isEmpty().trim().escape()
      
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
    const newMeeting = new newMeeting({
        
        name: req.body.name,
        meetingName: req.body.meetingName,
        meetingId: req.body.meetingId,
        meetingPassword: req.body.meetingPassword,

      });
  
      // insert data into database
      newMeeting.save(function (error, result) {
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

  router.get('/meeting/:meetingId/:meetingPassword', 
                function(req,res){
                Meeting.findOne(function(error, result){
                    if(error){
                      return res.json({
                        status: false,
                        message: 'cannot find.. ',
                        error: error
                      });
                    }
                    return res.json({
                      status: true,
                      message: 'found a meeting',
                      result: result
                    });
                });
                });
 //module exports
module.exports = router;