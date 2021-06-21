import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import GoogleMapComp from '../components/GoogleMapComp';
import { db } from "../firebase"


export default function Quiz() {
    // get url parameters
    const { id } = useParams()
    console.log(id)

    // states
    const [quizData, setQuizData] = useState()

    const history = useHistory()

    useEffect(() => {
        // gets the quizs document from firestore
        const quizesDbRef = db.collection("quizes").doc(id)

        // gets the data
        quizesDbRef.get().then((doc) => {
            if (doc.exists) {
                setQuizData(doc.data())

               
                
            } else {
                console.log("Quiz id was invalid; redirecting...")
                history.push("/dashboard/")
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            history.push("/dashboard")
        })
    }, [id, history])

    useEffect(() => {
        if (!quizData) { return }
         // geting creators doc
         const usersDbRef = db.collection("users").doc(quizData.creator.id)
         // getting data
         usersDbRef.get().then((usersDoc) => {
             console.log(usersDoc.data())
         })
    }, [quizData])

    // the wraped map
    const WrapedMap = withScriptjs(withGoogleMap(GoogleMapComp))


    console.log(quizData)
    

    
    return (
        <div>
            quiz {id}
            {/* google maps thing */}
            <div style={{width: "100%", height: "100vh"}}>
                <WrapedMap 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{height: "100%"}} />}
                    containerElement={<div style={{height: "100%"}} />}
                    mapElement={<div style={{height: "100%"}} />} 
                />
            </div>
        </div>
    )
}
