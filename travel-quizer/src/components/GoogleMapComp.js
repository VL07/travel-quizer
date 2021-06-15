import React from 'react'
import { GoogleMap } from 'react-google-maps';


export default function GoogleMapComp({children, defaultZoom, defaultCenter, ...rest}) {
    return (
        <GoogleMap  defaultCenter={defaultCenter} defaultZoom={defaultZoom} {...rest}>
            {children}
        </GoogleMap>
    )
}


GoogleMapComp.defaultProps = {
    defaultZoom: 10, 
    defaultCenter: {"lat": 57.696991, "lng": 11.986500}
}