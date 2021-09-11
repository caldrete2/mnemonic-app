const invoice = require('../models/db_invoice');

async function createInvoice(body) {
	const invoice_values = [body.user_id, body.unit, body.po, 
								body.labor, 1000.00]

    const id = await invoice.createInvoice(invoice_values)
        .then(res => { return res.rows[0].invoice_id })
    	.catch(e => console.error(e.stack))
    
	if(body.details.length > 0) {
		details = body.details.map(e => {
			const detail_values = [e.desc, e.rate, e.qty]
			
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

module.exports = {
	createInvoice
}
