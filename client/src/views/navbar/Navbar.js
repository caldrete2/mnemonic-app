import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {SidebarData} from './SidebarData'
import './Navbar.css'
import {IconContext} from 'react-icons'

function Navbar() {
	const [sidebar, setSidebar] = useState(false);

	const sidebarItems = SidebarData.map((elem, i) => {
		return (
			<li 
				key={i}
				className={elem.cName}>
				<Link to={elem.path}>
					{elem.icon}
					<span>{elem.title}</span>
				</Link>
			</li>
		)	
	})

	const showSidebar = event => {
		event.preventDefault()
		setSidebar(!sidebar)	
	}

	return (
		<>
		<IconContext.Provider value={{color: '#fff'}}>
			<div className='navbar'>
				<Link to='#' className='menu-bars'>
					<FaIcons.FaBars onClick={showSidebar} />
				</Link>
				<nav className={sidebar? 'nav-menu active' : 'nav-menu'}>
					<ul className='nav-menu-items' onClick={showSidebar}>
						<li className='navbartoggle'>	
							<Link to='#' className='menu-bars'>
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						{sidebarItems}
					</ul>
				</nav>
			</div>
		</IconContext.Provider>
		</>
	)
}

export default Navbar
