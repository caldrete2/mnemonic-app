import { useRef, useState, useEffect } from 'react'
import useReg from '../../utils/useReg'
import RegisterUI from './RegisterUI'
import { regContext } from '../../Context'
import axios from 'axios'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,14}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,14}$/

const Register = () => {
	const userRef = useRef()
	const errRef = useRef()

	const [errMsg, setErrMsg] = useState('')
	const [success, setSuccess] = useState('')
	
	const [ 
		creds, valid, focus,
		setValid, setFocus,
		handleChange
	] = useReg()
	
	console.log(creds)

	const {user, pwd, match} = creds

	const handleSubmit = e => {
		e.preventDefault()
		console.log('clicked')
	}

	useEffect(() => {userRef.current.focus()}, [])

	useEffect(() => {
		setValid(pState => ({
			...pState, 
			validName: USER_REGEX.test(user)	
		}))
	}, [user, setValid])

	useEffect(() => {
			setValid(pState => ({
				...pState, 
				validPwd: PWD_REGEX.test(pwd),
				validMatch: pwd === match		
			}))
	}, [pwd, match, setValid])

	useEffect(() => {
		setErrMsg('')	
	}, [user, pwd, match])

	return(
		<>
			<regContext.Provider value={{
				valid, focus, creds, setFocus, success, 
				errMsg, userRef, errRef, handleChange,
				handleSubmit	
			}}>
				<RegisterUI />
			</regContext.Provider>
		</>
	)
}

export default Register
