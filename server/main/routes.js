const express = require('express');
const router = express.Router();
const user_ctrl = require('./controllers/user_controller');
const user_qry = require('./models/db_user')
const invoice_qry = require('./models/db_invoice')

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
	const invoice_values = [req.body.user_id, req.body.unit,
							req.body.po, req.body.labor, 1000.00]

	inoice_qry.createInvoice(invoice_values)
		.then(res => { return res.rows[0].invoice_id })
		.then(key => {
			req.body.details.map(e => {
				const detail_values = [key, e.desc, e.rate, e.qty]		
				invoice_qry.postDetails(detail_values)
					.catch(e => console.error(e.stack))
			})

			req.body.materials.map(e => {
				const material_values = [key, e.item, e.cost, e.count]
				invoice_qry.postMaterials(material_values)
					.catch(e => console.error(e.stack))				
				})
		})
})

module.exports = router;
