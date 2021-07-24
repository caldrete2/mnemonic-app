import React, {Component} from 'react'
import axios from 'axios'

class AddContact extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			email: '',
			phone: '',
			street:'',
			city: '',
			zipcode: '',
			state: ''	
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	handleSubmit(event) {
		event.preventDefault()
		const data = this.state
		axios.post('/api/post/newcontact', data)
			.then(res => console.log(res.data))
			.catch((err) => console.log(err))
		this.props.history.push('/')
	}

	render() {
		const keys = Object.entries(this.state)
		const contactForm = keys.map((elem, i) => {
			return (
				<div key={i}>
					<input
						type='text'
						name={elem[0]}
						value={elem[1]}
						onChange={this.handleChange}
						placeholder={elem[0]}
					/><br />
				</div>
			)		
		})

		return (
			<main>
				<form>
					{contactForm}	
				</form>
				<button 
					type='submit'
					onClick={this.handleSubmit}
				>Done</button>
			</main>
		)
	}
}

export default AddContact 
