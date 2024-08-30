var db = require("../models")
let bcrypt = require('bcrypt');
const path = require('path');
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken');
const { response } = require('express');
const { resolve } = require('path');

module.exports = {

  success: function (res, message = '', body = {}) {
    return res.status(200).json({
      'success': true,
      'code': 200,
      'message': message,
      'body': body
    });
  },

  failed: function (res, message = '') {
    message = (typeof message === 'object') ? (message.message ? message.message : '') : message;
    return res.status(400).json({
      'success': false,
      'code': 400,
      'message': message,
      'body': {}
    });
  },
  create_token: async function (id, email, res) {
    try {
      console.log(process.env.secret_jwt);
      const token = await jwt.sign({ id: id, email: email }, process.env.secret_jwt);
      return token;
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  comparePass: async (requestPass, dbPass) => {
    console.log(requestPass, dbPass);
    dbPass = dbPass.replace('$2y$', '$2b$');
    const match = await bcrypt.compare(requestPass, dbPass);
    return match;
  },


  unixTimestamp: function () {
    var time = Date.now();
    // console.log(new Date(time));
    var n = time / 1000;
    return (time = Math.floor(n));
  },
  vaildObject: async function (required, non_required, res) {
    let msg = '';
    let empty = [];
    let table_name = (required.hasOwnProperty('table_name')) ? required.table_name : 'users';

    for (let key in required) {
      if (required.hasOwnProperty(key)) {
        if (required[key] == undefined || required[key] == '') {
          empty.push(key)
            ;
        }
      }
    }
    console.log(empty, "fdcgb");

    if (empty.length != 0) {
      msg = empty.toString();
      if (empty.length > 1) {
        msg += " fields are required"
      } else {
        msg += " field is required"
      }
      res.status(400).json({
        'success': false,
        'msg': msg,
        'code': 400,
        'body': {}
      });
      return;
    } else {
      console.log(required, "jbhbv");

      const marge_object = Object.assign(required, non_required);
      delete marge_object.checkexit;

      for (let data in marge_object) {
        if (marge_object[data] == undefined) {
          delete marge_object[data];
        } else {
          if (typeof marge_object[data] == 'string') {
            marge_object[data] = marge_object[data].trim();
          }
        }
      }

      return marge_object;
    }
  },
  error: function (res, err, req) {
    console.log(err, "===========================>error");
    let code = typeof err === "object" ? (err.code ? err.code : 403) : 403;
    let message =
      typeof err === "object" ? (err.message ? err.message : "") : err;

    if (req) {
      req.flash("flashMessage", {
        color: "error",
        message,
      });

      const originalUrl = req.originalUrl.split("/")[1];
      return res.redirect(`/${originalUrl}`);
    }

    return res.status(code).json({
      success: false,
      message: message,
      code: code,
      body: {},
    });
  },



  error401: function (res, err, req) {
    console.log(err, "===========================>error");
    let code = typeof err === "object" ? (err.code ? err.code : 401) : 401;
    let message =
      typeof err === "object" ? (err.message ? err.message : "") : err;

    if (req) {
      req.flash("flashMessage", {
        color: "error",
        message,
      });

      const originalUrl = req.originalUrl.split("/")[1];
      return res.redirect(`/${originalUrl}`);
    }

    return res.status(code).json({
      success: false,
      message: message,
      code: code,
      body: {},
    });
  },

  checkValidation: async (v) => {
    var errorsResponse;

    await v.check().then(function (matched) {
      if (!matched) {
        var valdErrors = v.errors;
        var respErrors = [];
        Object.keys(valdErrors).forEach(function (key) {
          if (valdErrors && valdErrors[key] && valdErrors[key].message) {
            respErrors.push(valdErrors[key].message);
          }
        });
        errorsResponse = respErrors.join(", ");
      }
    });
    return errorsResponse;
  },


  imageUploads: async function (file, folder) {
    let file_name_string = file.name;
    var file_name_array = file_name_string.split(".");
    var file_extension = file_name_array[file_name_array.length - 1];
    var letters = "ABCDE1234567890FGHJK1234567890MNPQRSTUXY";
    var result = "";
    while (result.length < 28) {
      var rand_int = Math.floor((Math.random() * 19) + 1);
      var rand_chr = letters[rand_int];
      if (result.substr(-1, 1) != rand_chr) result += rand_chr;
    }
    let name = result + '.' + file_extension;
    file.mv('public/' + folder + '/' + name, function (err) {
      if (err) reject(err);
    });
    console.log('image name', name);
  },

  fileUploded: async (files) => {
    try {
      // console.log(files);

      var extension = path.extname(files.image.name);

      var fileImage = uuidv4() + extension;


      files.image.mv(process.cwd() + '/public/images' + fileImage, function (err) {
        if (err)
          console.log(err);
      });

      return fileImage

    } catch (error) {

    }
  },

  profilePicUploded: async (files) => {
    try {
      // console.log(files);

      var extension = path.extname(files.image.name);

      var fileImage = uuidv4() + extension;


      files.image.mv(process.cwd() + '/public/images/' + fileImage, function (err) {
        if (err)
          console.log(err);
      });

      return fileImage

    } catch (error) {

    }
  },

  






  imageUploadArray: (file, folder = 'users') => {

    let image = file;

    if (Array.isArray(image) === true) {
      temp_array = [];
      Promise.all(image.map(async c => {
        var extension = path.extname(c.name);

        if (extension != '') {
          var fileimage = uuidv4() + extension;
          c.mv(process.cwd() + '/public/' + folder + '/' + fileimage, function (err) {
            if (err)
              console.log(err);
          });
          temp_array.push(fileimage)
        }

      }));
      return temp_array
    } else {

      temp_array = [];

      var extension = path.extname(image.name);
      var fileimage = uuidv4() + extension;
      image.mv(process.cwd() + '/public/' + folder + '/' + fileimage, function (err) {
        if (err)
          console.log(err);
      });

      temp_array.push(fileimage)
      return temp_array;

    }

  },


  translate: async (user_id, message) => {
    var userObj = await db.users.findOne({ where: { id: user_id } })
    var lan = "en"
    if (userObj.language == 2) {
      lan = "ar"
    }
    var language = await translate(message, { from: 'en', to: lan })
    return language
  },

  create_stripe_connect_url: async function (stripe, getUser, stripeReturnUrl) {
    try {
      let account;
      let accountLink;
      let hasAccountId = '0';
      if (getUser?.hasAccountId == 0) {
        account = await stripe.accounts.create({
          country: 'US',
          type: 'express',
          // id: getUser.id,
          email: getUser?.email,
          capabilities: {
            card_payments: {
              requested: true,
            },
            transfers: {
              requested: true,
            },
          },
          business_profile: {
            url: stripeReturnUrl,
          },
        });
        accountLink = await stripe.accountLinks.create({
          account: account?.id,
          refresh_url: stripeReturnUrl,
          return_url: stripeReturnUrl,
          type: 'account_onboarding',
        });
        hasAccountId = '0'
      } else {
        account = await stripe.accounts.retrieve(
          getUser?.stripeAccountId
        );
        if (account?.charges_enabled == false) {
          accountLink = await stripe.accountLinks.create({
            account: account?.id,
            refresh_url: stripeReturnUrl,
            return_url: stripeReturnUrl,
            type: 'account_onboarding',
          });

          hasAccountId = '0'
        } else {
          hasAccountId = '1'
        }
      }
      const update_user = await db.users.update(
        {
          stripeAccountId: account?.id,
          hasAccountId: hasAccountId
        },
        {
          where: {
            id: getUser.id
          }
        }
      );
      return accountLink
    } catch (err) {
      console.log(err, '======================================');
      throw err
    }
  },


  sendEmail:async(otp,email,name)=>{
    const { createTransport } = require('nodemailer');

    const transporter = createTransport({
        host: "smtp.titan.email",
        port: 587,
        // secure: true,
        requireTLS: true,
        auth: {
            user: "nooniqapp@nooniqapp.com",
            // pass: "Silver1946!",
            pass:"Silver1946!ASDcedz23!@"
        },
    });
    
    const mailOptions = {
        from: 'nooniqapp@nooniqapp.com',
        to: email,
        subject: `NoonIQ App: Verify OTP`,
        html: `Hi, ${name} your otp is ${otp} please verify.`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
  },

}          