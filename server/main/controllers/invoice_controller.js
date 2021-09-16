const invoice = require('../models/db_invoice');

function getTotalDue(labor, details, materials) {
	const res1 = details.map(e => {
		return (e.rate * e.qty)
	})
	
	const res2 = materials.map(e => {
		return (e.cost * e.count)	
	})

	return( 
		Math.round(parseInt(res1) + parseInt(res2) + 
		parseInt(labor)).toFixed(2)
	)	
}

async function createInvoice(body) {
	const total = await getTotalDue(body.labor, body.details, body.materials)
	console.log(total)
	const invoice_values = [body.user_id, body.unit, body.po, 
								body.labor, total]

    const id = await invoice.createInvoice(invoice_values)
        .then(res => { return res.rows[0].invoice_id })
    	.catch(e => console.error(e.stack))
    
	if(body.details.length > 0) {
		details = body.details.map(e => {
			const detail_values = [e.descr, e.rate, e.qty]
			
			return invoice.postDetails(id, detail_values)
				.catch(e => console.error(e.stack))
		})
	}

	if(body.materials.length > 0) {
    	materials = body.materials.map(e => {
    		const material_values = [e.item, e.cost, e.count]
                
			invoice.postMaterials(id, material_values)
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
