import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"

export default function Signup() {
    // refs
    const emailRef = useRef()
    const passwordRef = useRef()
    const repeatPasswordRef = useRef()
    const usernameRef = useRef()

    // states
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // Use auth thing
    const { signupUser, currentUser } = useAuth()

    // history to redirect
    const history = useHistory()



    async function onSubmit(e) {
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
            await signupUser(emailRef.current.value, passwordRef.current.value)

            // geting users doc
            const usersDbRef = db.collection("users").doc(currentUser.uid)

            // seting users data
            usersDbRef.set({username: usernameRef.current.value, score: 1}).then(() => {
                console.log("Successfully wrote data")
            }).catch((error) => {
                console.error("Error writing document: ", error)
            })

            history.push("/dashboard")
        } catch {
            setError("Unable to create user")
            setLoading(false)
        }
    }

    return (
        <div>
            {/* If error display it */}
            {error && <p>{error}</p>}
            <form onSubmit={onSubmit} >
                <input type="email" ref={emailRef} placeholder="Email" name="email" />
                <input type="text" ref={usernameRef} placeholder="Username" name="username" />
                <input type="password" ref={passwordRef} placeholder="Password" name="password" />
                <input type="password" ref={repeatPasswordRef} placeholder="Confirm password" name="repeat-password" />
                <input type="submit" name="submit" value="Signup" disabled={loading} />
            </form>
        </div>
    )
}
