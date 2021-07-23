const { Pool } = require('pg')

var connString = (process.env.PORT)?
	process.env.DATABASE_URL : 'postgresql://my_user:root@localhost:5432/mnemonic'

const pool = new Pool({
	connectionString: connString,
	ssl: { rejectUnauthorized: false }
})

function getAllContacts() {
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

module.exports = {
		getAllContacts,
		updateContact
}
