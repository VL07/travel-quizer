import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase"

export default function EditProfile() {

    // sets the states
    const [userData, setUserData] = useState({username: "Loading...", score: 1})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // gets the current user
    const { currentUser } = useAuth()

    // gets history
    const history = useHistory()

    // refs
    const usernameRef = useRef()


    useEffect(() => {
        // gets the users document from firestore
        const usersDbRef = db.collection("users").doc(currentUser.uid)

        // gets the data
        usersDbRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setUserData(doc.data())
                setLoading(false)
            } else {
                // Data dosn't exist; redirecting to dashboard to create document
                console.log("No such document! redirecting...");

                history.push("/dashboard")
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            setUserData({username: "Error, please reload the page!", score: -1})
            setError("Error, please reload the page!")
        })
    }, [currentUser.uid, history])


    // on form submit
    function handlesubmit(e) {
        e.preventDefault() // to make the browser not reload the page

        // if input is empty
        if (!usernameRef.current.value) {
            setError("Invalid username")
            return
        }

        // if last username match the new
        if (usernameRef.current.value === userData.username) {
            setError("Use a different username than your last")
            return
        }

         // gets users db
         const usersDbRef = db.collection("users").doc(currentUser.uid)

        // success: seting data
        
        usersDbRef.update({username: usernameRef.current.value}).then(() => {
            console.log("Successfully updated data")
            history.push("/dashboard")
        }).catch((error) => {
            console.error("Error updating document: ", error)
            setError("Error, please reload the page!")
            setLoading(true)
        })
    }


    return (
        <div>
            {error && <p>{error}</p> }
            <form onSubmit={handlesubmit}>
                <input type="text" placeholder={userData.username} ref={usernameRef} disabled={loading} />
                <input type="submit" value="Change" disabled={loading} />
            </form>
            <Link to="/dashboard">Cancel</Link>
        </div>
    )
}
