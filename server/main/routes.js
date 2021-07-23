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

	qry.updateContact(u_values)
		.then(q_res => console.log(q_res.rows))
		.catch(err => console.log(err.stack))	
})

router.get('/api', (req, res) => {
	res.json({message: "Hello from my server!"});	
})

module.exports = router;
