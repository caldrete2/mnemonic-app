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

module.exports = {
	createInvoice,
	postDetails,
	postMaterials
}
