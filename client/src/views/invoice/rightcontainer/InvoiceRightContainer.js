import React from 'react'
import User from './UserDisplay'
import Details from './DetailsDisplay'
import Materials from './MaterialsDisplay'
import './InvoiceRightContainer.css'

function InvoiceRightContainer(props) {
	const {user, state, handleDelete} = props
	const {unit, po, details, materials, labor} = state

	return(
		<div id='right-container'>
			<User 
				state={user} 
				unit={unit}
				po={po}
			/><br/>
			<Details 
				data={details}
				handleDelete={handleDelete}
			/>
			<Materials 
				data={materials}
				handleDelete={handleDelete}
			/>
			<div id='labor-container'>
				<b><label>Labor</label></b><br/>
				<p>${labor}</p>
			</div>
		</div>
	)
}
export default InvoiceRightContainer
