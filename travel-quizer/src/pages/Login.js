import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
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
        <div>
            {/* If error display it */}
            {error && <p>{error}</p>}
            <form onSubmit={onSubmit} >
                <input type="email" ref={emailRef} placeholder="Email" name="email" />
                <input type="password" ref={passwordRef} placeholder="Password" name="password" />
                <input type="submit" name="submit" value="Signup" disabled={loading} />
            </form>
        </div>
    )
}
