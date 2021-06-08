import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from "../contexts/AuthContext"

export default function Signup() {
    // refs
    const emailRef = useRef()
    const passwordRef = useRef()
    const repeatPasswordRef = useRef()

    // states
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // Use auth thing
    const { signupUser } = useAuth()

    // history to redirect
    const history = useHistory()



    function onSubmit(e) {
        // prevents reload
        e.preventDefault()

        // make the user unable to submit two times
        setLoading(true)

        // Chacks is passwords dosn't match
        if (passwordRef.current.value !== repeatPasswordRef.current.value) {
            setLoading(false)
            return setError("Password dosn't match")
        }

        // Trys to create user
        try {
            setError("")
            signupUser(emailRef.current.value, passwordRef.current.value)

            history.push("/dashboard")
        } catch {
            setError("Unable to create user")
        }
        setLoading(false)
    }

    return (
        <div>
            {/* If error display it */}
            {error && <p>{error}</p>}
            <form onSubmit={onSubmit} >
                <input type="email" ref={emailRef} placeholder="Email" name="email" />
                <input type="password" ref={passwordRef} placeholder="Password" name="password" />
                <input type="password" ref={repeatPasswordRef} placeholder="Confirm password" name="repeat-password" />
                <input type="submit" name="submit" value="Signup" disabled={loading} />
            </form>
        </div>
    )
}
