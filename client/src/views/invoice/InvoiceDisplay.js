import React, {Component} from 'react'
import User from './UserDisplay'
import Details from './DetailsDisplay'
import axios from 'axios'

class InvoiceDisplay extends Component {
	constructor(props) {
		super()
		this.state = {
			data: [],
			isLoading: false	
		}	
	}

	componentDidMount() {
		const {invoice_id} = this.props.location.state
		
		this.setState({isLoading: true})
		axios.get('/api/get/displayinvoice', {params: {id: invoice_id}})
			.then(res => this.setState({data: res.data, isLoading: false}))
			.catch(e => console.log(e.stack))
	}	

	render() {
		console.log(this.props.location.state)
		const {
			name, email, po, 
			phone, street, city, 
			state, unit, total_due,
			labor_cost
		} = this.props.location.state

		const user = {name, email, phone, street, city, state}
		
		const {isLoading, data} = this.state

		const details = data.length > 0? 
			<Details data={data[0]} /> : 
			<h2> Details Loading ... </h2>  
		
		if(isLoading) {
			return <h1>Page Loading...</h1>
		}
		console.log(this.props.location.state)
		return (
			<div>
				<div>
					<User
						state={user}
						unit={unit}
						po={po}
					/>
					{details}
					<div>
						<h3>
							Labor: ${Math.round(labor_cost).toFixed(2)}
						</h3>
						<h2>
							Total Due: ${Math.round(total_due).toFixed(2)}
						</h2>
					</div>
				</div>
			</div>
		)
	}
}

export default InvoiceDisplay
