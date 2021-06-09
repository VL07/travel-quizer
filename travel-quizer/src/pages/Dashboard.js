import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import LogoutButton from '../components/LogoutButton'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

export default function Dashboard() {
    const { currentUser } = useAuth() 

    // logs user for debugin
    // TODO: REMOVE LATER
    console.log(currentUser)
    
    // sets the states
    const [userData, setUserData] = useState({username: "Coming soon", score: 1})

    // defines react router stuff
    const location = useLocation()

    


    useEffect(() => {
        // gets the users document from firestore
        const usersDbRef = db.collection("users").doc(currentUser.uid)

        // gets the data
        usersDbRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setUserData(doc.data())
            } else {
                // Data dosn't exist; setting data
                console.log("No such document!");

                // geting url parameters
                const urlParams = new URLSearchParams(window.location.search)
                const username = urlParams.get('username')

                usersDbRef.set({username: username, score: 1}).then(() => {
                    console.log("Successfully wrote data")
                }).catch((error) => {
                    console.error("Error writing document: ", error)
                })
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    }, [currentUser.uid, location])
    

    return (
        <div>
            <p>{currentUser.email}</p>
            <LogoutButton>Logout</LogoutButton>
            <p>Score: {userData.score}</p>
        </div>
    )
}
