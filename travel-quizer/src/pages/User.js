import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

export default function User() {
    // get currentuser
    const { currentUser } = useAuth()

    // geting dynamic url parameter
    const { id } = useParams()

    const history = useHistory()

    // sets the states
    const [userData, setUserData] = useState({username: "Coming soon", score: 1})

    // redirects to dashboard if it's the current user
    if (id === currentUser.uid) {
        console.log("Current user")
        history.push("/dashboard")
    }

    useEffect(() => {
        // gets the users document from firestore
        const usersDbRef = db.collection("users").doc(id)

        // gets the data
        usersDbRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                console.log(id)
                setUserData(doc.data())
            } else {
                // Data dosn't exist; so redirecting to /dashboard
                console.log("doc didn't exist")
                history.push("/dashboard")
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    }, [history, id])

    return (
        <div>
            Hello user {userData.username}
        </div>
    )
}
