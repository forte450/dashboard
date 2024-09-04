const helper = require('../helper/helper');
var db = require('../models')
var path = require('path')
var flash = require('connect-flash');
const { where } = require('sequelize');



module.exports = {

  login: async (req, res) => {
    try {
      res.render('users/login', { msg: req.flash('msg') });
    } catch (error) {
      console.log(error);
    }
  },
  dashboard: async (req, res) => {
    try {

      if (!req.session.user) return res.redirect("/login");
      let totalUsers = await db.users.count({where:{role:1}})
      let title = "dashboard"
      res.render('dashboard',{totalUsers,title, session: req.session.user, msg: req.flash('msg')});
    } catch (error) {
      console.log(error);
    }
  },


  signup: async (req, res) => {
    try {
      const required = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role_id: 1,
        phone_number: req.body.phone_number,
      };
      const nonRequired = {
        image: req.files,
      };
      let requestData = await helper.vaildObject(required, nonRequired, res);

      var userObj = await db.users.findOne({ where: { promoCode: requestData.promoCode }, raw: true, nest: true })

      const finduser = await db.users.findOne({
        where: {
          email: requestData.email
        }
      })

      const image = await helper.profilePicUploded(req.files)
      const hashpassword = await bcrypt.hash(requestData.password, 10);
      requestData.image = image;
      requestData.password = hashpassword


      const user = await db.users.create({ ...requestData })

      if (userObj) {
        const characters = 'AkhJitW';
        let promoCode = '';
        for (let i = 0; i < characters.length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          promoCode += characters.charAt(randomIndex);
        }
        await db.users.update({ promoCode: promoCode }, { where: { id: user.id } })
        await db.promo_code_users.create({ share_to: user.id, share_by: userObj.id })
      }

      const token = await helper.create_token(user.id, user.email)

      const find_users = await db.users.findOne({
        where: {
          id: user.id
        },
        raw: true,
        nest: true
      })



      return helper.success(res, 'Signup Successfully', find_users)

    } catch (error) {
      return helper.error(res, error)
    }

  },


  login_post: async (req, res) => {
    try {
      // console.log("login post");return
      let finduser = await db.users.findOne({
        where: {
          email: req.body.email
        },
        raw: true
      })

      if (finduser) {
        let checkPassword = await helper.comparePass(req.body.password, finduser.password);

        if (finduser.status == 1) {

          if (checkPassword == true) {
            req.session.user = finduser

            // req.flash('msg', 'Login Successfully');
            // res.send(finduser);
            res.redirect("/dashboard")

          }
          else {
            console.log("");
            req.flash('msg', 'please enter valid detail')
            res.redirect("/login")
          }
        } else {
          console.log("This user not veryfied");
          req.flash('msg', 'This user not veryfied')
          res.redirect("/admin")
        }
      } else {
        console.log("This user not Registered");
        req.flash('msg', 'This user not Registered')
        res.redirect("/users/login")
      }

    } catch (error) {
      console.log(error);
    }
  },

  logout_admin: async (req, res) => {

    try {
        req.session.destroy()
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
},

}