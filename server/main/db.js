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

function updateAddress(body) {
	return pool.query(
			`UPDATE addr
			SET street=$2, city=$3, zipcode=$5, state=$4
			WHERE addr_id=$1`, body	
	)
}

function deleteUser(key) {
	return pool.query(
			`DELETE FROM users
			WHERE user_id='${key}'`
	)
}

function deleteAddr(key) {
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

function newAddr(body) {
	return pool.query(
		`INSERT INTO addr(user_id, street, city, state, zipcode)
		VALUES($1, $2, $3, $4, $5)`, body
	)
}

function createInvoice(body) {
	return pool.query(
		`INSERT INTO invoice(user_id, created_date, due_date, 
			labor_cost, total_due)
		VALUES($1, NOW(), NOW() + INTERVAL '14 DAYS', $2, $3) 
		RETURNING invoice_id`, body	
	)
}

function postDetails(body) {
	return pool.query(
		`INSERT INTO details(invoice_id, descr, rate, qty) 
		VALUES($1, $2, $3, $4)`, body
	)
}

function postMaterials(body) {
	return pool.query(
		`INSERT INTO materials(invoice_id, item, cost, count) 
		VALUES($1, $2, $3, $4)`, body
	)
}

module.exports = {
		getAllContacts,
		updateContact,
		updateAddress,
		deleteUser,
		deleteAddr,
		newContact,
		newAddr, 
		createInvoice, 
		postDetails,
		postMaterials
}
