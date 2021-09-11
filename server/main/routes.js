const express = require('express');
const router = express.Router();
const user_ctrl = require('./controllers/user_controller');
const invoice_ctrl = require('./controllers/invoice_controller');

router.get('/api/get/allcontacts', async (req, res) => {
	const result = await user_ctrl.getAllContacts()
						.then(res => {return res})
						.catch(e => console.log(e))
	res.json(result)
})

router.post('/api/post/updatecontact', (req, res) => {
	user_ctrl.updateContact(req.body)
		.then(res => console.log(res))
		.catch(e => console.log(e))
})

router.delete('/api/delete/contact', (req, res) => {
	user_ctrl.deleteContact(req.query.key)
		.then(res => console.log(res))
		.catch(err => console.log(err.stack))	
})

router.post('/api/post/newcontact', (req, res) => {
	user_ctrl.newContact(req.body)
		.then(res => console.log(res))
		.catch(err => console.log(err.stack))	
})

router.post('/api/post/invoice', (req, res) => {
	invoice_ctrl.createInvoice(req.body)
		.then(res => console.log(res))
		.catch(e => console.log(e.stack))
})

module.exports = router;
