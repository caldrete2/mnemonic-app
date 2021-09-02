import React from 'react'
import * as FaIcons from 'react-icons/fa'
import './DetailsDisplay.css'

function DetailsDisplay(props) {
	const {data, handleDelete} = props
	
	const detailList = data.map((elem, i) => {
		return(
			<tr key={i}>
				<td>{elem.desc}</td>
				<td>{elem.rate}</td>
				<td>{elem.qty}</td>
				<td>{elem.total}</td>
				<td><FaIcons.FaTrash 
						onClick={()=> handleDelete(elem, 'details')}
					/></td>
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
