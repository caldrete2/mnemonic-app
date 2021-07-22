const express = require('express');
const router = express.Router();
const qry = require('./db');

router.get('/api/get/allcontacts', (req, res) => {
	qry.getAllContacts()
		.then(q_res => res.json(q_res.rows))
		.catch(err => console.error(err.stack))
})

router.get('/api', (req, res) => {
	res.json({message: "Hello from my server!"});	
})

module.exports = router;
