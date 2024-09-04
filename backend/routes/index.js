var express = require('express');
var router = express.Router();
var usersController = require('../controllers/userController');
const invoiceController = require('../controllers/invoiceController');
const cmsCon = require('../controllers/cms_controller');
const paymentController = require('../controllers/paymentController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',usersController.login);
router.post('/login_post', usersController.login_post);
router.get('/dashboard',usersController.dashboard)
router.get('/logout', usersController.logout_admin);

router.get('/invoiceListing', invoiceController.invoiceListing)
router.get('/invoiceCreate', invoiceController.invoiceCreate)
router.post('/addInvoice', invoiceController.addInvoice)
router.get('/recurringinvoiceCreate', invoiceController.RecurringinvoiceCreate)
router.delete('/delete/:id', invoiceController.deleteInvice)

router.post('/payment', paymentController.initiatePayment);





router.get("/view_terms_and_conditions", cmsCon.view_terms);
router.post("/post_terms_and_conditions/:id", cmsCon.post_terms);

router.get("/view_privacy_policy", cmsCon.view_privacy);
router.post("/post_privacy_policy/:id", cmsCon.post_policy);

router.get("/view_about", cmsCon.view_about);
router.post("/post_about/:id", cmsCon.post_about);


module.exports = router;
