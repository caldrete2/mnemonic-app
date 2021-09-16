const { Pool } = require('pg')

var connString = (process.env.PORT)?
    process.env.DATABASE_URL : 'postgresql://my_user:root@localhost:5432/mnemonic'

const pool = new Pool({
    connectionString: connString,
    ssl: { rejectUnauthorized: false }
})

function createInvoice(body) {
    return pool.query(
        `INSERT INTO invoice(user_id, unit, po, created_date,
            due_date, labor_cost, total_due)
        VALUES($1, $2, $3, NOW(), NOW() + INTERVAL '14 DAYS', $4, $5)
        RETURNING invoice_id`, body
    )
}

function postDetails(id, body) {
    return pool.query(
        `INSERT INTO details(invoice_id, descr, rate, qty)
        VALUES('${id}', $1, $2, $3)`, body
    )
}

function postMaterials(id, body) {
    return pool.query(
        `INSERT INTO materials(invoice_id, item, cost, count)
        VALUES('${id}', $1, $2, $3)`, body
    )
}

function activeInvoice() {
	return pool.query(
		`SELECT * FROM invoice AS i
		JOIN users AS u
		ON i.user_id=u.user_id
		JOIN addr AS a
		ON a.user_id=u.user_id
		WHERE due_date > NOW()
		ORDER BY i.due_date ASC;`
	)
}

function getDetails(id) {
	return pool.query(
		`SELECT * FROM details
		WHERE invoice_id='${id}'`
	)
}

function getMaterials(id) {
	return pool.query(
		`SELECT * FROM materials
		WHERE invoice_id='${id}'`
	)
}

module.exports = {
	createInvoice,
	postDetails,
	postMaterials,
	activeInvoice,
	getDetails,
	getMaterials
}
