import React from 'react'

function CreateDetails(props) {
	const {handleChange, detailClick} = props
	const {descr, rate, qty} = props.state

	return(
		<main>
			<form>
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
				/><br/>
				<button
					name='detail-button'
					onClick={detailClick}
				>Add</button>
			</form>
		</main>
	)
}
export default CreateDetails
