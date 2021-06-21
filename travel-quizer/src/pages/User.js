import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Card from '../components/Card'
import FlexRight from '../components/FlexRight'
import Section from '../components/Section'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

export default function User() {
    // get currentuser
    const { currentUser } = useAuth()

    // geting dynamic url parameter
    const { id } = useParams()

    const history = useHistory()

    // sets the states
    const [userData, setUserData] = useState({username: "Loading", score: "Loading"})

    // redirects if user isent loged in
    if (!currentUser) {
        history.go(-1)
    }

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
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}} className="fill-screen bg">
        <Card>
            <FlexRight style={{justifyContent: "space-between"}}>
                <h1>User: {userData.username}</h1>
            </FlexRight>
            <Section>
                <FlexRight style={{justifyContent: "space-between"}}>
                    <h1>Info</h1>
                </FlexRight>
                <h2 className="fw-normal">Username: {userData.username}</h2>
                <h2 className="fw-normal">Score: {userData.score}</h2>          
            </Section>
        </Card>
    </div>
    )
}
