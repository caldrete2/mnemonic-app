const user = require('../models/db_user')
 
async function getAllContacts() {
	const result = await user.allContacts()
					.then(q_res => { return q_res.rows })
        			.catch(err => console.error(err.stack))

	return result 
}

async function updateContact(body) {
	const u_values = [body.ukey, body.name, body.email, body.phone]
	const a_values = [body.street, body.city, body.state, body.zipcode]

	const u_res = user.updateContact(u_values)
		.catch(err => console.log(err.stack))
	
	let a_res = '';

	if(body.akey) {
		 a_res = user.updateAddress(body.akey, a_values)
			.catch(err => console.log(err.stack))
	} else {
		a_res = user.newAddress(body.ukey, a_values)
			.catch(err => console.log(err.stack))
	}

	return [await u_res, await a_res]
}

async function deleteContact(key) {
	const a_res = await user.deleteAddress(key)
					.catch(e => console.log(e.stack))
	
	const u_res = await user.deleteUser(key)
					.catch(e => console.log(e.stack))

	return [a_res, u_res]
}

async function newContact(body) {
	const u_values = [body.name, body.email, body.phone]
	const a_values = [body.street, body.city,
                      body.state, body.zipcode]

    const key = await user.newContact(u_values)
        .then(res => { return res.rows[0].user_id })
    	.catch(e => console.log(e.stack))

	const result = user.newAddress(key, a_values)
        .catch(e => console.log(e.stack))
		
	return await result;
}

module.exports = {
	getAllContacts,
	updateContact,
	deleteContact,
	newContact
}
