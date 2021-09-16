import React, {Component} from 'react'
import axios from 'axios'

class OpenInvoice extends Component {
    constructor() {
        super()
        this.state = {
			data: []	
		}
    }

	componentDidMount() {
		axios.get('/api/get/activeinvoice')
			.then(res => this.setState({ data: res.data }))
			.catch(e => console.error(e.stack))		
	}

	handleRowClick(elem) {
		this.props.history.push('/invoiceDisplay', elem)
	}

    render() {
		const {data} = this.state

		const invoiceTable = data.map((elem, i) => {
			return (
				<tr key={i} onClick={() => this.handleRowClick(elem)}>
					<td>{elem.name}</td>
					<td>{elem.unit}</td>
					<td>{elem.due_date}</td>
					<td>${elem.total_due}</td>
				</tr>
			)	
		})

        return (
            <div className='Open-Invoice'>
                <table id='detail-display'>
                	<tbody>
					<tr>
                    	<th>Name</th>
                    	<th>Unit</th>
                    	<th>Due Date</th>
                    	<th>Total Due</th>
                	</tr>
            	    {invoiceTable}
					</tbody>
            	</table>
            </div>
        )
    }
}

export default OpenInvoice
