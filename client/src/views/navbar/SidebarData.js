import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as CgIcons from 'react-icons/cg'

export const SidebarData = [
	{
		title: 'Contacts',
		path: '/',
		icon: <AiIcons.AiFillContacts />,
		cName: 'nav-text'
	},
	{
		title: 'Open Invoice',
		path: '/openInvoice',
		icon: <FaIcons.FaFileInvoiceDollar />,
		cName: 'nav-text'
	},
	{
		title: 'History',
		path: '/history',
		icon: <FaIcons.FaHistory />,
		cName: 'nav-text'
	},
	{
		title: 'Profile',
		path: '/profile',
		icon: <CgIcons.CgProfile />,
		cName: 'nav-text'
	},
]
