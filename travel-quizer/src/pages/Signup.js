import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Copyright from '../components/Copyright'
import { useAuth } from "../contexts/AuthContext"
import { db } from '../firebase'

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
            const signupCallback = await signupUser(emailRef.current.value, passwordRef.current.value)
            console.log("created user")

            console.log(signupCallback.user.email)

            const usersDbRef = db.collection("users").doc(signupCallback.user.uid)

            // seting initial data
            usersDbRef.set({username: username, score: 1}).then(() => {
                console.log("Successfully wrote data")
            }).catch((error) => {
                console.error("Error writing document: ", error)
            })

            console.log(usernameRef)
            console.log("here:")
            console.log(username)
            history.push({pathname: "/dashboard"})
        } catch(err) {
            setError("Unable to create user")
            setLoading(false)
            console.error(err)
        }
    }

    return (
        <div className="signup">
            {/* If error display it */}
            {error && <p>{error}</p>}
            <form onSubmit={onSubmit} >
                <input type="email" ref={emailRef} placeholder="Email" name="email" required /><br />
                <input type="text" ref={usernameRef} placeholder="Username" name="username" required /><br />
                <input type="password" ref={passwordRef} placeholder="Password" name="password" required /><br />
                <input type="password" ref={repeatPasswordRef} placeholder="Confirm password" name="repeat-password" required /><br />
                <input type="submit" name="submit" value="Signup" disabled={loading} />
            </form>
        </div>
    )
}
