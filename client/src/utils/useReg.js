import { useState } from 'react'

const useReg = () => {
	const [creds, setCreds] = useState({
		user: '',
		pwd: '',
		match: ''
	})

	const [valid, setValid] = useState({
		validName: false,
		validPwd: false,
		validMatch: false
	})

	const [focus, setFocus] = useState({
		userFocus: false,
		pwdFocus: false,
		matchFocus: false
	})

	const handleChange = e => {
		e.persist()

		const {name, value} = e.target

		setCreds(pState => ({
			...pState,
			[name]: value	
		}))
	}	
	return [
		creds,
		valid, 
		focus, 
		setValid, 
		setFocus,
		handleChange
	]
}

export default useReg
