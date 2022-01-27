const auth = require('../models/db_auth')
const bcrypt = require('bcrypt')
const saltRounds = 10

const register = body => {

	bcrypt.hash(body.pwd, saltRounds, async (err, hash) => {
		const values = [body.user, hash]
		console.log(hash)
		const result = await auth.register(values)
			.then(q_res => console.log(q_res))
			.catch(err => console.log(err.stack))
	})
}

module.exports = {
	register
}
