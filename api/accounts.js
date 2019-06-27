const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Account = require('../models/accounts');// Account model

// @route GET /api
// @desc Get all accounts
// @access Public
router.get('/',  (req, res) => {
    console.log("GET /api");
    Account.find().then(accounts => res.json(accounts));
  });
  
// @route POST /api
// @desc Create an account
// @access Public
router.post('/', (req, res) => {
    console.log("POST /api");
    var newAccount = new Account({
      id: req.body.id,
      balance: req.body.balance,
      credit: req.body.credit,
      picture: req.body.picture,
      name_first: req.body.name_first,
      name_last: req.body.name_last,
      employer: req.body.employer,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      comment: req.body.comment,
      created: req.body.created,
      tags: req.body.tags
    });
    newAccount.save().then(item => res.json());
  });


// @route DELETE /api/:id
// @desc Delete an account
// @access Public
router.delete('/:id', (req, res) => {
  console.log("DELETE /api");
  Account.findById(req.params.id)
    .then(account => account.remove()
    .then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
});

// @route POST /api/find
// @desc  Find an account
// @access Public
router.post('/find', (req, res) => {
  console.log("POST /api/find");
  
  Account.find({name_last: req.body.name_last})
    .then(accounts => {
      if(accounts.length == 0){
        res.json({success: false, reason: "Cannot find one"});
      }else{
        res.json({success: true, detail: accounts});
      }
    })
  .catch(err => res.status(404).json({success: false}));
});

// @route GET /api/credit
// @desc Return credit chart data 
// @access Public
router.get('/credit', (req, res) => {
  console.log("GET /api/credit");
  Account.find()
    .then(accounts=> {
      var x = [0, 100, 200, 300, 400, 500, 600, 700, 800];
      var y = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      accounts.forEach(acc => {
        if(acc["credit"]<100){
          y[0] += 1;
        }else if(acc["credit"]<200){
          y[1] += 1;
        }else if(acc["credit"]<300){
          y[2] += 1;
        }else if(acc["credit"]<400){
          y[3] += 1;
        }else if(acc["credit"]<500){
          y[4] += 1;
        }else if(acc["credit"]<600){
          y[5] += 1;
        }else if(acc["credit"]<700){
          y[6] += 1;
        }else if(acc["credit"]<800){
          y[7] += 1;
        }
        
      });
      res.json({x: x, y: y});
    })
  .catch(err => res.status(404));
});


module.exports = router;