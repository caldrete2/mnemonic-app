import React from 'react'

function InvoiceCustInfo(props) {
	const {unit, po} = props.state
	const {handleChange} = props
	
	return(
		<main>
			<form>
				<label>Unit</label><br/>
				<input 
					name='unit'
					type='text'
					value={unit}
					onChange={handleChange}
				/><br/>
				<label>PO #</label><br/>
				<input
					name='po'
					type='text'
					value={po}
					onChange={handleChange}
				/>
			</form>
		</main>
	)
}
export default InvoiceCustInfo
