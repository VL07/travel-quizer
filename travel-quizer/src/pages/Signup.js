import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

export default function Signup() {
    // refs
    const emailRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef() 
    const repeatPasswordRef = useRef()

    // states
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // Use auth thing
    const { signupUser } = useAuth()

    // history to redirect
    const history = useHistory()



    async function onSubmit(e) {
        // prevents reload
        e.preventDefault()

        console.log("user submited")

        // make the user unable to submit two times
        setLoading(true)

        // Chacks is passwords dosn't match
        if (passwordRef.current.value !== repeatPasswordRef.current.value) {
            setLoading(false)
            return setError("Password dosn't match")
        }

        const username = usernameRef.current.value

        // Trys to create user
        try {
            setError("")
            await signupUser(emailRef.current.value, passwordRef.current.value)
            console.log("created user")

            console.log(usernameRef)
            console.log("here:")
            console.log(username)
            history.push({pathname: "/dashboard", search: `?username=${username}`})
        } catch(err) {
            setError("Unable to create user")
            setLoading(false)
            console.error(err)
        }
    }

    return (
        <div className="signup">
            <form onSubmit={onSubmit} >
                <h1>Signup</h1>
                {/* If error display it */}
                {error && <p className="error">{error}</p>}
                <input type="email" ref={emailRef} placeholder="Email" name="email" /><br />
                <input type="text" ref={usernameRef} placeholder="Username" name="username" /><br />
                <input type="password" ref={passwordRef} placeholder="Password" name="password" /><br />
                <input type="password" ref={repeatPasswordRef} placeholder="Confirm password" name="repeat-password" /><br />
                <input type="submit" name="submit" value="Signup" disabled={loading} /><br />
                <Link to="/login">Already have an account?</Link>
            </form>
        </div>
    )
}
