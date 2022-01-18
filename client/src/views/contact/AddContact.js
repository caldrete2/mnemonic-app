import React from 'react'
import useForm from '../../utils/useForm'
import { contactformContext } from '../../Context'
import ContactForm from './ContactForm'
import AddrForm from './AddrForm'
import axios from 'axios'
import ReactTimeout from 'react-timeout'

const AddContact = props => {
	const [values, handleChange] = useForm();

	const toggle = () => {
		props.history.push('/')
	}

	const handleSubmit = e => {
		e.preventDefault()
		axios.post('/api/post/newcontact', values)
			.then(res => console.log(res.data))
			.catch((err) => console.log(err))
		props.setTimeout(toggle, 5000)
		
	}

	return (
		<main>
			<contactformContext.Provider value={{values, handleChange}}>
				<form onSubmit={handleSubmit}>
					<ContactForm /><br/>
					<AddrForm /><br/>
					<input type='submit'/>
				</form>
			</contactformContext.Provider>
		</main>
	)
}

export default ReactTimeout(AddContact)
