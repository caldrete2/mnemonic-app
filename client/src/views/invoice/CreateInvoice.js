import React, {Component} from 'react'
import LeftContainer from './leftcontainer/InvoiceLeftContainer'
import RightContainer from './rightcontainer/InvoiceRightContainer'
import './CreateInvoice.css'
import axios from 'axios'

class CreateInvoice extends Component {
	constructor() {
		super()
		this.state = {
			unit: '',
			po: '',
			desc: '',
			rate: '',
			qty: '',
			item: '',
			count: '',
			cost: '',
			labor: '',
			details: [],
			materials: []	
		}

		this.handleChange = this.handleChange.bind(this)
		this.buttonClick = this.buttonClick.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	handleSubmit(event) {
		event.preventDefault()
		const {details, materials, unit, po, labor} = this.state
		const {user_id} = this.props.location.state
		const data = {
			user_id,
			details,
			materials,
			unit,
			po,
			labor	
		}

		axios.post('/api/post/invoice', data)
			.then(res => console.log(res))
			.catch((err) => console.log(err))
	}

	handleDelete(elem, a) {
		const {details, materials} = this.state
		if(a === 'details') {
			let i = details.indexOf(elem)
			if(i > -1) { details.splice(i,1) }
			this.setState({details: details})
		} else {
			let i = materials.indexOf(elem)
			if(i > -1) { materials.splice(i,1) }
			this.setState({materials: materials})	
		}
	}

	handleChange(event) {
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	buttonClick(event) {
		event.preventDefault()
		const {desc, rate, qty, details, cost, count, materials, item} = this.state
		const {name} = event.target
		const dObj = {desc, rate, qty, total: '0.00'}
		const mObj = {item, cost, count, total: '0.00'}	

		if(name === 'detail-button') {
			let temp = details.concat(dObj)
			this.setState({ details: temp, desc: '', qty: '', rate: ''  })
		} else {
			let temp = materials.concat(mObj)
			this.setState({ materials: temp, count: '', cost: '', item: '' })
		}
	}

	render() {
		return(
			<div id='invoice-container'>
				<LeftContainer 
					state={this.state}
					handleChange={this.handleChange}
					detailClick={this.buttonClick}
					handleSubmit={this.handleSubmit}
				/>
				<RightContainer
					user={this.props.location.state}
					state={this.state}
					handleDelete={this.handleDelete} 
				/>				
			</div>
		)
	}
}
export default CreateInvoice
