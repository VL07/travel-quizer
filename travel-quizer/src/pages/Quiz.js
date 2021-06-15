import React from 'react'
import { useParams } from 'react-router'
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import GoogleMapComp from '../components/GoogleMapComp';


export default function Quiz() {
    // get url parameters
    const { id } = useParams()

    // the wraped map
    const WrapedMap = withScriptjs(withGoogleMap(GoogleMapComp))

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
