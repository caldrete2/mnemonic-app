import React from 'react'
import * as FaIcons from 'react-icons/fa'
import './DetailsDisplay.css'

function MaterialsDisplay(props) {
	const {data, handleDelete} = props
	const materialList = data.map((elem, i) => {
		const icon = handleDelete? 	
			<FaIcons.FaTrash 
				onClick={() => handleDelete(elem, 'materials')}
			/> : 
			<></>
	
		const total = Math.round(elem.cost * elem.count).toFixed(2)

		return(
			<tr key={i}>
				<td>{elem.item}</td>
				<td>{elem.cost}</td>
				<td>{elem.count}</td>
				<td>{total}</td>
				<td>{icon}</td>
			</tr>
		)
	})

	return(
		<div>
			<table id='detail-display'>
				<tbody>
				<tr>
					<th>Item</th>
					<th>Cost</th>
					<th>Count</th>
					<th>Line Total</th>
				</tr>
				{materialList}
				</tbody>
			</table>
		</div>
	)
}
export default MaterialsDisplay
