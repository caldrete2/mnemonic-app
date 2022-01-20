import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const RegMsgs = [
	{
		userReqs: <><FontAwesomeIcon icon={faInfoCircle} />
        	4 to 24 characters.<br />
           	Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.</>,

		pwdReqs: <><FontAwesomeIcon icon={faInfoCircle} />
        	8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters: <span aria-label="exclamation mark">!</span> 
			<span aria-label="at symbol">@</span> 
			<span aria-label="hashtag">#</span> 
			<span aria-label="dollar sign">$</span> 
			<span aria-label="percent">%</span></>,

		matchReqs: <><FontAwesomeIcon icon={faInfoCircle} />
        	Must match the first password input field.</> 		
}]

export default RegMsgs
