const db = require('../models')
var path = require('path');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const { EmptyResultError } = require("sequelize");
const { Script } = require("vm");
module.exports = {
    view_terms: async (req, res) => {
        try {
            if (!req.session.user) return res.redirect("/login");
            let find_terms = await db.cms.findOne({
                where: {
                    id: 1
                },
            })
            res.render("cms/terms_and_conditions", { title: "Cms_trem",session:req.session.user, find_terms, msg: req.flash('msg') })
        } catch (error) {
            console.log(error);
        }
    },
    post_terms: async (req, res) => {
        try {
          const originalDescription = req.body.description;
          const trimmedDescription = originalDescription.trim();
      
          if (trimmedDescription === "") {
            return res.redirect("/view_terms_and_conditions");
          }
          let update_terms = await db.cms.update(
            {
              title: req.body.title,
              description: trimmedDescription,
            },
            {
              where: {
                id: 1,
              },
            }
          );
      
          req.flash('msg', 'Terms and conditions updated successfully');
          res.redirect("/view_terms_and_conditions");
        } catch (error) {
          console.log(error);
        }
      },
      
      
      
      
      
    view_privacy: async (req, res) => {
        try {
            if (!req.session.user) return res.redirect("/login");
            let find_policy = await db.cms.findOne({
                where: {
                    id: 3
                }
            })
            res.render("cms/privacy_policy", { title: "Cms_privecy",session:req.session.user, find_policy, msg: req.flash('msg') })
        } catch (error) {
            console.log(error);
        }
    },
    post_policy: async (req, res) => {
        try {

            const originalDescription = req.body.description;
          const trimmedDescription = originalDescription.trim();
      
          if (trimmedDescription === "") {
            return res.redirect("/view_privacy_policy")
          }
            const vali = {}
            let update_policy = await db.cms.update({
                title: req.body.title,
                description: req.body.description
            }, {
                where: {
                    id: 3
                }
            })
            req.flash('msg', 'Privacy policy  update Successfully');

            res.redirect("/view_privacy_policy")
        } catch (error) {
            console.log(error);
        }
    },


    view_about: async (req, res) => {
        try {
            if (!req.session.user) return res.redirect("/login");   
            let find_about = await db.cms.findOne({
                where: {
                    id: 2
                }
            })
            res.render("cms/about_us", { title: "Cms_about",session:req.session.user, find_about, msg: req.flash('msg') })
        } catch (error) {
            console.log(error);
        }
    },
    post_about: async (req, res) => {
        try {


            const originalDescription = req.body.description;
          const trimmedDescription = originalDescription.trim();
      
          if (trimmedDescription === "") {
            return res.redirect("/view_about")
          }
            let update_about = await db.cms.update({
                title: req.body.title,
                description: req.body.description
            }, {
                where: {
                    id: 2
                }
            });
            req.flash('msg', 'Help  update Successfully');

            res.redirect("/view_about")
        } catch (error) {
            console.log(error);
        }
    },

}