const invoice = require('../models/db_invoice');

async function createInvoice(body) {
	const total = 0.00
	const invoice_values = [
		body.user_id, body.unit, body.po, body.labor, total
	]

    const id = await invoice.createInvoice(invoice_values)
        .then(res => { return res.rows[0].invoice_id })
    	.catch(e => console.error(e.stack))
    
	if(body.details.length > 0) {
		const details = body.details.map(e => {
			const detail_values = [e.descr, e.rate, e.qty]
			
			return invoice.postDetails(id, detail_values)
				.catch(e => console.error(e.stack))
		})
	}
}

async function activeInvoice() {
	const result = await invoice.activeInvoice()
					.then(res => { return res.rows })
					.catch(e => console.log(e.stack))
	return result;
}

async function invoiceDisplay(id) {
	const details = invoice.getDetails(id)
					 .then(res => { return res.rows })
	
	const materials = invoice.getMaterials(id)
					   .then(res => { return res.rows })
	
	return [await details, await materials]
}

module.exports = {
	createInvoice,
	activeInvoice,
	invoiceDisplay
}	
