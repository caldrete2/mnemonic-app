import { useState } from 'react'

const useForm = () => {
	const [state, setState] = useState({});
	
	const handleChange = e => {
		e.persist();
		
		const {name, value} = e.target;
		 
		setState(pState => ({
			...pState, [name]: value
		}));
	}

	const reset = () => {
		setState(pState => ({
			...pState, 
			descr: '',
			qty: '',
			rate: ''	
		}))

		return 
	}

	return [state, handleChange, reset]
}

export default useForm;
