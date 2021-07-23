import React, {Component} from 'react'
import axios from 'axios'

class EditContact extends Component {
	constructor() {
		super()
		this.state = {
			data: []
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	handleChange(event) {
		const {name, value} = event.target
		this.setState(pState => {
			return {
				data: {
					...pState.data,
					[name]: value	
				}
			}
		})
	}
	
	componentDidMount() {
		this.setState({
			data: this.props.location.state	
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		const {data} = this.state
		console.log(data)
		axios.post('api/post/updatecontact', data)
			.then(res => console.log(res, data)) 
			.catch((err) => console.log(err))
	
	}

	handleDelete(event) {
		event.preventDefault()
		const {ukey} = this.state.data
		axios.delete('api/delete/contact', {params: {key: ukey}})
			.then(res => console.log(res, ukey))
			.catch((err) => console.log(err))
	}

	render() {
		const {data} = this.state
		const temp = Object.entries(data)
		const contactForm = temp.map((elem, i) => {
			return i!==0 && i!==1? (
					<div key={i}>
						<input
							type='text'
							name={elem[0]}
							value={elem[1]}
							placeholder={elem[0]}
							onChange={this.handleChange}
						/><br/>
					</div>
				) : null
		})

		return(
			<main>
				<form>
					{contactForm}
					<div className='editButton'>
						<button 
							type='submit'
							onClick={this.handleSubmit}
						>Submit</button>		
						<button onClick={this.handleDelete}>Delete</button>		
					</div>
				</form>
			</main>
		)
	}
}

export default EditContact
