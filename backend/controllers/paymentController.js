const axios = require('axios');

const paymentGatewayURL = 'https://afs.gateway.mastercard.com/ma';
const merchantID = 'TEST100273870';
const apiPassword = 'password12#';
module.exports = {
    initiatePayment : async (req, res) => {
        const { amount, currency, orderID } = req.body;
    
        try {
            const response = await axios.post(`${paymentGatewayURL}/order`, {
                merchant: {
                    id: merchantID,
                    password: apiPassword,
                },
                order: {
                    amount,
                    currency,
                    reference: orderID,
                },
            });
    
            req.flash('msg', 'please enter valid detail')
            res.redirect("/dashboard")
        } catch (error) {
            console.error('Payment initiation failed:', error);
            res.status(500).json({ error: 'Payment initiation failed' });
        }
    },
}

