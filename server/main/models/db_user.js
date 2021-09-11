const { Pool } = require('pg')

var connString = (process.env.PORT)?
	process.env.DATABASE_URL : 'postgresql://my_user:root@localhost:5432/mnemonic'

const pool = new Pool({
	connectionString: connString,
	ssl: { rejectUnauthorized: false }
})

function allContacts() {
	return pool.query(
			`SELECT  
				u.*,
				a.addr_id,
				a.street,
				a.city,
				a.state,
				a.zipcode
			FROM users AS u LEFT JOIN addr AS a
			ON u.user_id=a.user_id
			ORDER BY u.name ASC`
	)
} 

function updateContact(body) {
	return pool.query(
			`UPDATE users
			SET name=$2, email=$3, phone=$4
			WHERE user_id=$1`, body	
	)
}

function updateAddress(key, body) {
	return pool.query(
			`UPDATE addr
			SET street=$1, city=$2, zipcode=$4, state=$3
			WHERE addr_id='${key}'`, body	
	)
}

function deleteUser(key) {
	return pool.query(
			`DELETE FROM users
			WHERE user_id='${key}'`
	)
}

function deleteAddress(key) {
	return pool.query(
			`DELETE FROM addr
			WHERE user_id='${key}'`
	)
}

function newContact(body) {
	return pool.query(
		`INSERT INTO users(name, email, phone)
		VALUES($1, $2, $3) RETURNING user_id`, body
	)
}

function newAddress(key, body) {
	return pool.query(
		`INSERT INTO addr(user_id, street, city, state, zipcode)
		VALUES('${key}', $1, $2, $3, $4)`, body
	)
}

module.exports = {
		allContacts,
		updateContact,
		updateAddress,
		deleteUser,
		deleteAddress,
		newContact,
		newAddress
}
