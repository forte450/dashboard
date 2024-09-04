var db = require('../models')
module.exports = {
  invoiceListingss: async (req, res) => {
    try {
      if (!req.session.user) return res.redirect("/login");
      let title = "Invioce"
      let invoiceObj = await db.invoices.findAll({
        where: {
          user_id: req.session.user.id
        }
      })

      function formatDate(dateString) {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
      }

      // Loop through the array and add formatted date
      invoiceObj = invoiceObj.map(invoice => {
        return {
          ...invoice.dataValues, // Retain other fields
          formattedDate: formatDate(invoice.createdAt) // Add formatted date
        };
      });

      res.render('invoice/invoiceListing', { invoiceObj, title, session: req.session.user, msg: req.flash('msg') });
    } catch (error) {
      console.log(error);
    }
  },

  invoiceListing: async (req, res) => {
    try {
      if (!req.session.user) return res.redirect("/login");
  
      let title = "Invoice";
      let monthFilter = req.query.month; // Retrieve the month filter from query parameters
  
      // Create a where clause based on the optional month filter
      let whereClause = { user_id: req.session.user.id };
  
      if (monthFilter) {
        const month = parseInt(monthFilter, 10);
        if (month >= 1 && month <= 12) {
          whereClause.createdAt = {
            [db.Sequelize.Op.between]: [
              new Date(new Date().getFullYear(), month - 1, 1),
              new Date(new Date().getFullYear(), month, 0)
            ]
          };
        }
      }
  
      let invoiceObj = await db.invoices.findAll({ where: whereClause });
  
      function formatDate(dateString) {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
      }
  
      // Loop through the array and add formatted date
      invoiceObj = invoiceObj.map(invoice => {
        return {
          ...invoice.dataValues, // Retain other fields
          formattedDate: formatDate(invoice.createdAt) // Add formatted date
        };
      });
  
      res.render('invoice/invoiceListing', { 
        invoiceObj, 
        title, 
        session: req.session.user, 
        msg: req.flash('msg'),
        monthFilter // Pass the month filter to the template
      });
    } catch (error) {
      console.log(error);
    }
  },
  

  invoiceCreate: async (req, res) => {
    try {
      if (!req.session.user) return res.redirect("/login");
      let title = "Invioce"
      res.render('invoice/createInvoice', { title, session: req.session.user, msg: req.flash('msg') });
    } catch (error) {
      console.log(error);
    }
  },

  addInvoice: async (req, res) => {
    try {
      req.body.user_id = req.session.user.id
      console.log(req.body, "dddddddddddddddddddddddddddd");

      let createInvoice = await db.invoices.create(req.body)

      req.flash('msg', 'Invoice create successfully');
      res.redirect("/invoiceListing");
    } catch (error) {
      console.log(error);

    }
  },

  RecurringinvoiceCreate: async (req, res) => {
    try {
      if (!req.session.user) return res.redirect("/login");
      let title = "Invioce"
      res.render('invoice/createRecurringinvoice', { title, session: req.session.user, msg: req.flash('msg') });
    } catch (error) {
      console.log(error);
    }
  },

  deleteInvice: async (req, res) => {
    try {
      console.log("djskfhdasjgfdryeagcfs");
      let deleteCategory = await db.invoices.destroy({
        where: {

          id: req.body.id
        }
      })
      console.log(req.params.id, ">>>>>>>>>>>>>>>>>>finduser_details>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      res.redirect("/category_listing")
    } catch (error) {

      console.log(error);

    }
  },


}