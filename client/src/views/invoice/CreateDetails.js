import React, { useContext } from 'react'
import { invoiceContext } from '../../Context'

const CreateDetails = () => {
	const {handleChange, handleForm, values} = useContext(invoiceContext)
	const {descr, rate, qty, unit, po} = values

	return(
		<>
			<form onSubmit={handleForm}>  
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
                /><br />
				<label>Description</label><br/>
				<input
					name='descr'
					type='text'
					value={descr}
					onChange={handleChange}
				/><br/>
				<label>Rate</label><br/>
				<input
					name='rate'
					type='text'
					value={rate}
					onChange={handleChange}
				/><br/>
				<label>Qty</label><br/>
				<input
					name='qty'
					type='text'
					value={qty}
					onChange={handleChange}
				/><br/><input type='submit'/>	
			</form>
		</>
	)
}
export default CreateDetails
