import React from 'react'
import {BrowserRouter as Router,
		Switch,
		Route
} from 'react-router-dom'
import Navbar from './views/navbar/Navbar'
import './App.css'
import Contacts from './views/contact/Contacts'
import History from './views/History'
import OpenInvoice from './views/invoice/OpenInvoice'
import Profile from './views/Profile'
import EditContact from './views/contact/EditContact'
import AddContact from './views/contact/AddContact'
import CreateInvoice from './views/invoice/CreateInvoice'
import InvoiceDisplay from './views/invoice/InvoiceDisplay'
import Register from './views/signin/Register'

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Contacts} />
					<Route path='/openInvoice' component={OpenInvoice} />
					<Route path='/history' component={History} />
					<Route path='/profile' component={Profile} />
					<Route path='/editContact' component={EditContact} />
					<Route path='/addContact' component={AddContact} />
					<Route path='/createInvoice' component={CreateInvoice} />
					<Route path='/invoiceDisplay' component={InvoiceDisplay} />
					<Route path='/register' component={Register} />
				</Switch>
			</Router>
		</>
	)
}

export default App
