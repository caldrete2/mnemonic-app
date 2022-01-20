import { useContext } from 'react'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RegMsgs from './helper.js'
import { regContext } from '../../Context'
import './Register.css'

const RegisterUI = () => {
	const {userReqs, pwdReqs, matchReqs} = RegMsgs[0]
	const {
		errRef, errMsg, handleSubmit, 
		valid, creds, focus, userRef,
		handleChange, success, setFocus
	} = useContext(regContext)

	const {user, pwd, match} = creds
	const {validName, validPwd, validMatch} = valid
	const {userFocus, pwdFocus, matchFocus} = focus

	return(
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p><a href="#">Sign In</a></p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
							name='user'
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleChange}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setFocus(pState =>({...pState, userFocus: true}))}
                            onBlur={() => setFocus(pState => ({...pState, userFocus: false}))}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        	{userReqs}
						</p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
							name='pwd'
                            onChange={handleChange}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setFocus(pState => ({...pState, pwdFocus: true}))}
                            onBlur={() => setFocus(pState => ({...pState, pwdFocus: false}))}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        	{pwdReqs}
						</p>
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && match? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !match? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
							name='match'
                            onChange={handleChange}
                            value={match}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setFocus(pState => ({...pState, matchFocus: true}))}
                            onBlur={() => setFocus(pState => ({...pState, matchFocus: false}))}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        	{matchReqs}
                        </p>
                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )		
}

export default RegisterUI
