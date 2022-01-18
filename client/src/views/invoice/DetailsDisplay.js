import React, { useContext } from 'react'
import { invoiceContext } from '../../Context'
import * as FaIcons from 'react-icons/fa'
import './DetailsDisplay.css'

const DetailsDisplay = () => {
	const {details, setDetails}= useContext(invoiceContext)

	const handleDelete = elem => {
    	setDetails(details.filter(obj => obj !== elem))
    }

	const detailList = details.map((elem, i) => {		
		const icon = handleDelete? 	
			<FaIcons.FaTrash 
				onClick={() => handleDelete(elem)}
			/> : 
			<></>

		return(
			<tr key={i}>
				<td>{elem.descr}</td>
				<td>{elem.rate}</td>
				<td>{elem.qty}</td>
				<td>{elem.total}</td>
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
