import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {SidebarData} from './SidebarData'
import './Navbar.css'
import {IconContext} from 'react-icons'

class Navbar extends Component {
	constructor() {
		super()
		this.state = {
			sidebar: false	
		}

		this.showSideBar = this.showSideBar.bind(this)
	}

	showSideBar(event) {
		event.preventDefault()
		const {sidebar} = this.state
		this.setState({sidebar: !sidebar})
	}

	render() {
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

		return (
			<>
			<IconContext.Provider value={{color: '#fff'}}>
				<div className='navbar'>
					<Link to='#' className='menu-bars'>
						<FaIcons.FaBars onClick={this.showSideBar} />
					</Link>
					<nav className={this.state.sidebar? 'nav-menu active' : 'nav-menu'}>
						<ul className='nav-menu-items' onClick={this.showSideBar}>
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
}

export default Navbar
