import React, { useContext } from 'react'
import { contactformContext } from '../../Context'

const AddrForm = () => {
	const { 
		values, handleChange, curCustomer 
	} = useContext(contactformContext); 	
	
	const info = curCustomer? 
		curCustomer:
		{
			'street': 'street', 'city': 'city',
			'zipcode': 'zipcode', 'state': 'state'
		} 

	const {street, city, zipcode, state} = info;

	return(
		<>
			<input 
				type='text'
				name='street'
				placeholder={street}
				value={values.street}
				onChange={handleChange}
			/><br/>
			<input 
				type='text'
				name='city'
				placeholder={city}
				value={values.city}
				onChange={handleChange}
			/><br/>
			<input 
				type='text'
				name='state'
				placeholder={state}
				onChange={handleChange}
			/><br/>
			<input 
				type='text'
				name='zipcode'
				pattern='[0-9]*'
				placeholder={zipcode}
				value={values.zipcode}
				onChange={handleChange}
			/><br/>
		</>	
	)
}

export default AddrForm


