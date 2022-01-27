const auth = require('../models/db_auth')

const register = async body => {
	const values = [body.user, body.pwd]
	const result = await auth.register(values)
		.then(q_res => console.log(q_res))
		.catch(err => console.log(err.stack))

	console.log('Controller Done')
}

module.exports = {
	register
}
