const express = require('express');
const router = express.Router();
const db  = require('./dbConnection');
const { signupValidation } = require('./validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 
router.post('/mobileNoEnter', signupValidation, (req, res, next) => {

  var mobileCheck = 0;

  if (req.body.mobileNo.length == 10) {
    var mobileNo = req.body.mobileNo;
    for (var i = 0; i < mobileNo.length; i++) {
      if (mobileNo.at(i) == '0' || mobileNo.at(i) == '1' || mobileNo.at(i) == '2' || mobileNo.at(i) == '3' || mobileNo.at(i) == '4' || mobileNo.at(i) == '5' || mobileNo.at(i) == '6' || mobileNo.at(i) == '7' || mobileNo.at(i) == '8' || mobileNo.at(i) == '9') {

      } else {
        mobileCheck = 1;
        break;
      }
    }
  }

  if (req.body.mobileNo.length != 10 || req.body.mobileNo.at(0) == 0 || req.body.mobileNo.at(0) == 1 || req.body.mobileNo.at(0) == 2 || req.body.mobileNo.at(0) == 3 || req.body.mobileNo.at(0) == 4 || req.body.mobileNo.at(0) == 5) {
    mobileCheck = 1;
  }

  if (mobileCheck == 1) {
    res.status(400).send("plaese enter valid mobile number");
  } else {

    db.query(`select * from user where mobileNo = '${req.body.mobileNo}'`,
    (err,result) => {
      //console.log(result);
      if (result.length >= 1) {
        res.status(200).send('this mobileNo already exits use other number');
      } else {
        var val = Math.floor(1000 + Math.random() * 9000);
        //console.log(val);
        db.query(`insert into user(mobileNo,userOTP,verifyOtpStatus,userPanVerifyStatus,nameVerifiedPanStatus,age,emailOTP,emailOtpStatus,smsNotificationEmailSendChargeMoney,userPAN,fullName,gender,address,aadhar_voterCard_DL_passport,bankAccountNo,ifscCode,holderName,email,successfulSmsNotificationEmailSendMessage) values('${req.body.mobileNo}',${val},0,0,'','20',0,'',1,'','','','','','','','','','')`);
        res.status(200).send(`mobile number stored in database please use OTP ${val}`);
      }
    })
    
  }
});

router.post('/mobilOtpVerify', signupValidation, (req, res, next) => {

  var mobileCheck = 0;

  if (req.body.mobileNo.length == 10) {
    var mobileNo = req.body.mobileNo;
    for (var i = 0; i < mobileNo.length; i++) {
      if (mobileNo.at(i) == '0' || mobileNo.at(i) == '1' || mobileNo.at(i) == '2' || mobileNo.at(i) == '3' || mobileNo.at(i) == '4' || mobileNo.at(i) == '5' || mobileNo.at(i) == '6' || mobileNo.at(i) == '7' || mobileNo.at(i) == '8' || mobileNo.at(i) == '9') {

      } else {
        mobileCheck = 1;
        break;
      }
    }
  }

  if (req.body.mobileNo.length != 10 || req.body.mobileNo.at(0) == 0 || req.body.mobileNo.at(0) == 1 || req.body.mobileNo.at(0) == 2 || req.body.mobileNo.at(0) == 3 || req.body.mobileNo.at(0) == 4 || req.body.mobileNo.at(0) == 5) {
    mobileCheck = 1;
  }

  if (mobileCheck == 1) {
    res.status(400).send("plaese enter valid mobile number");
  } else {

    console.log(req.body.mobileNo+" "+req.body.userOtp);
    db.query(`select * from user where mobileNo= '${req.body.mobileNo}' and userOtp = '${req.body.userOtp}'`,
    (err,result) => {
      console.log(result.length);


      if (result.length >= 1) {
        res.status(200).send("SUCCESS!");
      } else {
        res.status(200).send("FAILED!");
      }
    });
  }
});

router.post('/mobilOtpVerify', signupValidation, (req, res, next) => {

    db.query(`select * from user where mobileNo= ${req.body.mobileNo} and userOtp = ${req.body.userOtp}`,
    (err,result) => {
      //console.log(result.length);


      if (result.length) {
        res.status(200).send("SUCCESS!");
      } else {
        res.status(200).send("FAILED!");
      }
    });
});

router.post('/enterPassword', signupValidation, (req, res, next) => {

  console.log(req.body.userPassword);
  const bcrypt = require("bcrypt");
  const saltRounds = 10
  const password = req.body.userPassword;

  var mobileCheck = 0;

  if (req.body.mobileNo.length == 10) {
    var mobileNo = req.body.mobileNo;
    for (var i = 0; i < mobileNo.length; i++) {
      if (mobileNo.at(i) == '0' || mobileNo.at(i) == '1' || mobileNo.at(i) == '2' || mobileNo.at(i) == '3' || mobileNo.at(i) == '4' || mobileNo.at(i) == '5' || mobileNo.at(i) == '6' || mobileNo.at(i) == '7' || mobileNo.at(i) == '8' || mobileNo.at(i) == '9') {

      } else {
        mobileCheck = 1;
        break;
      }
    }
  }

  if (req.body.mobileNo.length != 10 || req.body.mobileNo.at(0) == 0 || req.body.mobileNo.at(0) == 1 || req.body.mobileNo.at(0) == 2 || req.body.mobileNo.at(0) == 3 || req.body.mobileNo.at(0) == 4 || req.body.mobileNo.at(0) == 5) {
    mobileCheck = 1;
  }

  if (mobileCheck == 1) {
    res.status(400).send("plaese enter valid mobile number");
  } else {
    if (password.length >= 8) {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          throw err
        } else {
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
              throw err
            } else {
              console.log("password"+hash);
    
              db.query(`update user set userPassword = '${hash}' where mobileNo = '${req.body.mobileNo}'`);
              res.status(200).send('updated user password successfully');
              //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
            }
          })
        }
      })
    }
  }
    
});

router.post('/enterPAN', signupValidation, (req, res, next) => {

    console.log(req.body.userPAN);

    var mobileCheck = 0;

  if (req.body.mobileNo.length == 10) {
    var mobileNo = req.body.mobileNo;
    for (var i = 0; i < mobileNo.length; i++) {
      if (mobileNo.at(i) == '0' || mobileNo.at(i) == '1' || mobileNo.at(i) == '2' || mobileNo.at(i) == '3' || mobileNo.at(i) == '4' || mobileNo.at(i) == '5' || mobileNo.at(i) == '6' || mobileNo.at(i) == '7' || mobileNo.at(i) == '8' || mobileNo.at(i) == '9') {

      } else {
        mobileCheck = 1;
        break;
      }
    }
  }

  if (req.body.mobileNo.length != 10 || req.body.mobileNo.at(0) == 0 || req.body.mobileNo.at(0) == 1 || req.body.mobileNo.at(0) == 2 || req.body.mobileNo.at(0) == 3 || req.body.mobileNo.at(0) == 4 || req.body.mobileNo.at(0) == 5) {
    mobileCheck = 1;
  }

  if (mobileCheck == 1) {
    res.status(400).send("plaese enter valid mobile number");
  } else {
    db.query(`update user set userPAN = '${req.body.userPAN}' where mobileNo = '${req.body.mobileNo}'`);

    //write code for pan verify online here 
    db.query(`update user set userPanVerifyStatus = 1 where mobileNo = '${req.body.mobileNo}'`);

    res.status(200).send("successfully updated user PAN and pan verify status");
  }
    
});

router.post('/enterfullName', signupValidation, (req, res, next) => {

  //console.log(req.body);

  var fullName = req.body.firstName+" "+req.body.middleName+" "+req.body.lastName;
  db.query(`update user set fullName = '${fullName}' where mobileNo = '${req.body.mobileNo}'`);

  //write code for pan verify online here 
  db.query(`update user set  nameVerifiedPanStatus  = 1 where mobileNo = '${req.body.mobileNo}'`);
  db.query(`update user set gender = '${req.body.userGender}' where mobileNo = '${req.body.mobileNo}'`);
  var ageDifMs = Date.now() - new Date(req.body.userDob);
   var ageDate = new Date(ageDifMs); // miliseconds from epoch
   var age = Math.abs(ageDate.getUTCFullYear() - 1970);

   if (age >= 18) {
    db.query(`update user set DOB = '${req.body.userDob}' where mobileNo = '${req.body.mobileNo}'`);
    db.query(`update user set age = ${age} where mobileNo = '${req.body.mobileNo}'`);
   } else {
    res.status(200).send("age is below 18, please enter greater than equal to 18");
   }

   db.query(`update user set address = '${req.body.address}' where mobileNo = '${req.body.mobileNo}'`);
   db.query(`update user set aadhar_voterCard_DL_passport = '${req.body.aadhar_voterCard_DL_passport}' where mobileNo = '${req.body.mobileNo}'`);
   db.query(`update user set bankAccountNo = '${req.body.bankAccountNo}' where mobileNo = '${req.body.mobileNo}'`);
   db.query(`update user set ifscCode = '${req.body.ifscCode}' where mobileNo = '${req.body.mobileNo}'`);
   db.query(`update user set holderName = '${req.body.holderName}' where mobileNo = '${req.body.mobileNo}'`);
//    db.query(`update user set email = '${req.body.email}' where mobileNo = '${req.body.mobileNo}'`);
//   const nodemailer = require('nodemailer');
//   let mailTransporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'rit2012015dipu@gmail.com',
//         pass: '%%%%%@8651020532'
//     }
// });
 
// let mailDetails = {
//     from: 'rit2012015dipu@gmail.com',
//     to: req.body.email,
//     subject: 'Registration mail',
//     text: 'You have successfully registered please enter 654321 as otp'
// };
 
// mailTransporter.sendMail(mailDetails, function(err, data) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('Email sent successfully');
//     }
// });

  res.status(200).send("successfully updated the details");
});

router.post('/login', signupValidation, (req, res, next) => {

  //console.log(req.body);
  //db.query(`update user set gender = '${req.body.userGender}' where mobileNo = '${req.body.mobileNo}'`);

  const bcrypt = require("bcrypt");
  const saltRounds = 10
  const password = req.body.userPassword;

  var mobileCheck = 0;

  if (req.body.mobileNo.length == 10) {
    var mobileNo = req.body.mobileNo;
    for (var i = 0; i < mobileNo.length; i++) {
      if (mobileNo.at(i) == '0' || mobileNo.at(i) == '1' || mobileNo.at(i) == '2' || mobileNo.at(i) == '3' || mobileNo.at(i) == '4' || mobileNo.at(i) == '5' || mobileNo.at(i) == '6' || mobileNo.at(i) == '7' || mobileNo.at(i) == '8' || mobileNo.at(i) == '9') {

      } else {
        mobileCheck = 1;
        break;
      }
    }
  }

  if (req.body.mobileNo.length != 10 || req.body.mobileNo.at(0) == 0 || req.body.mobileNo.at(0) == 1 || req.body.mobileNo.at(0) == 2 || req.body.mobileNo.at(0) == 3 || req.body.mobileNo.at(0) == 4 || req.body.mobileNo.at(0) == 5) {
    mobileCheck = 1;
  }

  if (mobileCheck == 1) {
    res.status(400).send("plaese enter valid mobile number");
  }  else {
    db.query(`select userPassword from user where mobileNo = '${req.body.mobileNo}'`,
          (err,result) => {

            console.log(result);

            if (result.length >= 1) {
              bcrypt.compare(password, result[0].userPassword, function(err, result1) {
                console.log(result1);
                if (result1) {
                    console.log("equal");
                    res.status(200).send("login successfully");
                } 
            });
            } else {
              res.status(200).send("please enter valid mobileNo or password");

            }
      }
   );  
  }

  db.query(`select userPassword from user where mobileNo = '${req.body.mobileNo}'`,
          (err,result) => {


            bcrypt.compare(password, result[0].userPassword, function(err, result1) {
              if (result1) {
                  console.log("equal");
                  res.status(200).send("login successfully");

              } else {
                res.status(401).send("Unauthorized access");

              }
          });
           
      }
   );  
});

// router.post('/enterGender', signupValidation, (req, res, next) => {

//   console.log(req.body.userGender);
//   db.query(`update user set gender = '${req.body.userGender}' where mobileNo = '${req.body.mobileNo}'`);


//   res.status(200).send("successfully updated Gender");
// });

// router.post('/enterDob', signupValidation, (req, res, next) => {


//   var ageDifMs = Date.now() - new Date(req.body.userDob);
//    var ageDate = new Date(ageDifMs); // miliseconds from epoch
//    var age = Math.abs(ageDate.getUTCFullYear() - 1970);

//    if (age >= 18) {
//     db.query(`update user set DOB = '${req.body.userDob}' where mobileNo = '${req.body.mobileNo}'`);
//     db.query(`update user set age = ${age} where mobileNo = '${req.body.mobileNo}'`);
//     res.status(200).send("successfully updated DOB and age");

//    } else {
//     res.status(200).send("age is below 18, please enter greater than equal to 18");

//    }
// });

// router.post('/enterAddress', signupValidation, (req, res, next) => {

//   console.log(req.body.address);
//   db.query(`update user set address = '${req.body.address}' where mobileNo = '${req.body.mobileNo}'`);

//   res.status(200).send("successfully updated address");
// });

// router.post('/enteraadhar_voterCard_DL_passport', signupValidation, (req, res, next) => {

//   console.log(req.body.aadhar_voterCard_DL_passport);
//   db.query(`update user set aadhar_voterCard_DL_passport = '${req.body.aadhar_voterCard_DL_passport}' where mobileNo = '${req.body.mobileNo}'`);

//   res.status(200).send("successfully updated aadhar_voterCard_DL_passport");
// });

// router.post('/enterbankAccountNo', signupValidation, (req, res, next) => {

//   console.log(req.body.bankAccountNo);
//   db.query(`update user set bankAccountNo = '${req.body.bankAccountNo}' where mobileNo = '${req.body.mobileNo}'`);

//   res.status(200).send("successfully updated Bank Account Number");
// });
 
module.exports = router;
