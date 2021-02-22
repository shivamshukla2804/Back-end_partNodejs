const mongoose = require('mongoose');
const router = require('express').Router();
const bodyParser = require('body-parser');
const profile = require('../models/profile');
const User = require('../models/user');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.all(
  '/',
  function (req,res) {
      return res.json({
          status: true,
          message: 'profile controller working fine ...:)'
      });
  }
);

router.post(
  '/profile',
  function(req,res){
      // create new use model
  var newprofile = new profile({
      user_image: req.body.user_image,
      name: req.body.name,
      email: req.body.email,
      recovery_email: req.body.recovery_email,
      meeting_detail: req.body.meeting_detail
    });

    // insert data into database
    newprofile.save(function (error, result) {
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

router.get(
  '/profile/:email',
  function (req, res) {

      profile.findOne({
        email: req.param.email
      })
        .exec (function (error, result) {

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

router.put('/book/:email', function(req, res) {
  profile.findOneAndUpdate({
    email: req.params.email
    },
    { $set: { name: req.body.name }
  }, {upsert: true}, function(err, newprofile) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newprofile);
      res.send(newprofile);
    }
  });
});


//module exports
module.exports = router;










