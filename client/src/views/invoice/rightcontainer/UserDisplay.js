import React from 'react'
import './UserDisplay.css'

function UserDisplay(props) {
	const {name, email, phone, street, city, state} = props.state
	const {unit, po} = props
	return(
		<div id='user-container'>
			<div className='user-invoice-info'>
				<h2>{name}</h2>
				<p>{email}</p>
				<p>{phone}</p>
				<p>{street}</p>
				<p>{city}, {state}</p>
			</div>
			<div className='extra-info'>
				<b><label>Unit</label></b><br/>
				<p>{unit}</p>
				<b><label>PO #</label></b><br/>
				<p>{po}</p>
			</div>
		</div>
	)
}
export default UserDisplay
