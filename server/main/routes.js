const express = require('express');
const router = express.Router();
const qry = require('./db');

router.get('/api/get/allcontacts', (req, res) => {
	qry.getAllContacts()
		.then(q_res => res.json(q_res.rows))
		.catch(err => console.error(err.stack))
})

router.post('/api/post/updatecontact', (req, res) => {
	const u_values = [req.body.ukey, req.body.name,
					 req.body.email, req.body.phone]
	
	const a_values = [req.body.akey, req.body.street,
					 req.body.city, req.body.state,
					 req.body.zip]
	
	qry.updateContact(u_values)
		.then(
			qry.updateAddress(a_values)
				.then(q_res => console.log(q_res))
				.catch(err => console.log(err.stack))
		)
		.catch(q_err => console.log(q_err.stack))
		
})

router.delete('/api/delete/contact', (req, res) => {
	const key = req.query.key

	qry.deleteAddr(key)
		.then(
			qry.deleteUser(key)
				.then(q_res => console.log(q_res))
				.catch(e => console.log(e.stack))
		)
		.catch(err => console.log(err.stack))	
})

router.post('/api/post/newcontact', (req, res) => {
	const u_values = [req.body.name, req.body.email, req.body.phone]

	qry.newContact(u_values)
		.then(res => { return res.rows[0].user_id })
		.then(key => {
			const a_values = [key, req.body.street, req.body.city, 
							 req.body.state, req.body.zipcode]
							 	
			qry.newAddr(a_values)
				 .catch(e => console.log(e.stack))
		})
		.catch(err => console.log(err.stack))	
})

router.post('/api/post/invoice', (req, res) => {
	const invoice_values = [req.body.user_id, req.body.labor, 1000.00]

	qry.createInvoice(invoice_values)
		.then(res => { return res.rows[0].invoice_id })
		.then(key => {
			req.body.details.map(e => {
				const detail_values = [key, e.desc, e.rate, e.qty]		
				qry.postDetails(detail_values)
					.catch(e => console.error(e.stack))
			})

			req.body.materials.map(e => {
				const material_values = [key, e.item, e.cost, e.count]
				qry.postMaterials(material_values)
					.catch(e => console.error(e.stack))				
				})
		})
})

module.exports = router;
