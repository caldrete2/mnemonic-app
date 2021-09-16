import React from 'react'
import * as FaIcons from 'react-icons/fa'
import './DetailsDisplay.css'

function DetailsDisplay(props) {
	const {data, handleDelete} = props

	const detailList = data.map((elem, i) => {		
		const icon = handleDelete? 	
			<FaIcons.FaTrash 
				onClick={() => handleDelete(elem, 'details')}
			/> : 
			<></>

		const total = Math.round(elem.qty * elem.rate).toFixed(2)

		return(
			<tr key={i}>
				<td>{elem.descr}</td>
				<td>{elem.rate}</td>
				<td>{elem.qty}</td>
				<td>{total}</td>
				<td>{icon}</td>
			</tr>
		)
	})

	return(
		<div>
			<table id='detail-display'>
				<tr>
					<th>Description</th>
					<th>Rate</th>
					<th>Qty</th>
					<th>Line Total</th>
				</tr>
				{detailList}
			</table>
		</div>
	)
}
export default DetailsDisplay
