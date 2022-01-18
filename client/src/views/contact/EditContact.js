import React from 'react'
import useForm from '../../utils/useForm'
import axios from 'axios'
import ReactTimeout from 'react-timeout'
import { contactformContext } from '../../Context'
import ContactForm from './ContactForm'
import AddrForm from './AddrForm' 

function EditContact(props) {
	const curCustomer = props.location.state
	const [values, handleChange] = useForm();

	const toggle = () => {
		props.history.push('/')
	}

	const handleSubmit = e => {
		e.preventDefault();
		const {user_id, addr_id} = curCustomer;
		const data = {...values, ukey: user_id, akey: addr_id}

		axios.post('api/post/updatecontact', data)
			.then(res => console.log(res, data)) 
			.catch((err) => console.log(err))
		props.setTimeout(toggle, 3000)	
	}

	const handleDelete = e => {
		e.preventDefault()
		const {user_id} = curCustomer		

		axios.delete('api/delete/contact', {params: {key: user_id}})
			.then(res => console.log(res, user_id))
			.catch((err) => console.log(err))
		props.setTimeout(toggle, 3000)
	}

	return (
		<main>
			<contactformContext.Provider 
				value={{values, handleChange, curCustomer}}
			>
				<form onSubmit={handleSubmit}>
					<ContactForm /><br />
					<AddrForm /><br/>
					<input type='submit' />
					<button onClick={handleDelete}>Delete</button>
				</form>
			</contactformContext.Provider>
		</main>
	)
}

export default ReactTimeout(EditContact)
