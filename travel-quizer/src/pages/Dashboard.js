import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import FlexRight from '../components/FlexRight'
import LogoutButton from '../components/LogoutButton'
import Section from '../components/Section'
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
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}} className="fill-screen bg">
            <Card>
                <FlexRight style={{justifyContent: "space-between"}}>
                    <h1>Dashboard</h1>
                    <LogoutButton>Logout</LogoutButton>
                </FlexRight>
                <Section>
                    <FlexRight style={{justifyContent: "space-between"}}>
                        <h1>Info</h1>
                        <Link to="/edit"><h2>Edit</h2></Link>
                    </FlexRight>
                    <h2 className="fw-normal">Username: {userData.username}</h2>
                    <h2 className="fw-normal">Score: {userData.score}</h2>          
                </Section>
            </Card>
        </div>
    )
}
