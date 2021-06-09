import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

export default function Signup() {
    // refs
    const emailRef = useRef()
    const passwordRef = useRef()

    // states
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // Use auth thing
    const { loginUser } = useAuth()

    // history to redirect
    const history = useHistory()



    async function onSubmit(e) {
        // make the user unable to submit two times
        setLoading(true)

        setError("")
        // prevents reload
        e.preventDefault()

        

        // Trys to create user
        try {
            setError("")
            await loginUser(emailRef.current.value, passwordRef.current.value)

            setLoading(false)
            history.push("/dashboard")
        } catch (err) {
            console.warn(err)
            setError("Youser didn't exist")
            setLoading(false)
        }
    }

    return (
        <div className="login">
            <form onSubmit={onSubmit} >
                <h1>Login</h1>
                {/* If error display it */}
                {error && <p className="error">{error}</p>}
                <input type="email" ref={emailRef} placeholder="Email" name="email" /><br />
                <input type="password" ref={passwordRef} placeholder="Password" name="password" /><br />
                <input type="submit" name="submit" value="Signup" disabled={loading} /><br />
                <Link to="/signup">Don't have an account?</Link>
            </form>
        </div>
    )
}
