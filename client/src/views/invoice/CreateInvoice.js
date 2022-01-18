import React, { useState } from 'react'
import axios from 'axios'
import useForm from '../../utils/useForm'
import UserDisplay from './UserDisplay'
import Details from './DetailsDisplay'
import CreateDetails from './CreateDetails'
import { invoiceContext } from '../../Context'
import './CreateInvoice.css'

const CreateInvoice = (props) => {
	const user = props.location.state
	const [details, setDetails] = useState([])
	const [values, handleChange, reset] = useForm() 

	const handleForm = e => {
        e.preventDefault()
		const {descr, rate, qty} = values
		const total = (Number(rate) * Number(qty)).toFixed(2) 
		const temp = {descr, rate, qty, total}

		setDetails(pState => [...pState, temp])
		reset()
    }

	const handleSubmit = e => {
		e.preventDefault()
		const {user_id} = user
		const {unit, po} = values
		const data = {user_id, unit, po, details}

		axios.post('/api/post/invoice', data)
			.then(res => console.log(res))
			.catch((err) => console.log(err))
			.finally(props.history.push('/'))	
	}

	return(
		<div id='invoice-container'>
			<invoiceContext.Provider 
				value={{
					values, handleChange, user, 
					handleForm, details, setDetails
				}}
			>
					<CreateDetails />
					<div id='display-container'>
						<UserDisplay />
						<Details />
						<button onClick={handleSubmit}>
							Done
						</button>
					</div>
			</invoiceContext.Provider>				
		</div>
	)
}
export default CreateInvoice
