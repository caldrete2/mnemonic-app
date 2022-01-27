import React, { useContext } from 'react'
import { contactformContext } from '../../Context'

const ContactForm = () => {
	const { 
		values, handleChange, curCustomer
	 } = useContext(contactformContext); 	
	
	const info = curCustomer? curCustomer : 
		{'name': 'name', 'email': 'email', 'phone':'phone'}; 

	const {name, email, phone } = info;

	return(
		<>
			<input 
				type='text'
				name='name'
				placeholder={name}
				value={values.name}
				onChange={handleChange}
			/><br/>
			<input 
				type='text'
				name='email'
				placeholder={email}
				value={values.email}
				onChange={handleChange}
			/><br/>
			<input 
				type='text'
				name='phone'
				pattern='[0-9]*'
				placeholder={phone}
				value={values.phone}
				onChange={handleChange}
			/><br/>
		</>	
	)
}

export default ContactForm
