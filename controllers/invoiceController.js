var db = require('../models')
module.exports={
  invoiceListing:async(req, res)=>{
        try {
          if (!req.session.user) return res.redirect("/login");
            let title = "Invioce"
            let invoiceObj = await db.users.findAll({
              // where:{
              //   id:req.session.user.id
              // }
            })
            res.render('invoice/invoiceListing',{invoiceObj,title,session: req.session.user, msg: req.flash('msg')});
          } catch (error) {
            console.log(error);
          }
    },
    
    invoiceCreate:async(req, res)=>{
      try {
        if (!req.session.user) return res.redirect("/login");
          let title = "Invioce"
          res.render('invoice/createInvoice',{title,session: req.session.user, msg: req.flash('msg')});
        } catch (error) {
          console.log(error);
        }
  },


}