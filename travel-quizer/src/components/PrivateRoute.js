import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

// Pages with this inside will redirect the user to the dashboard page if the user isn't logged in
export default function PrivateRoute({component: Component}, ...rest) {
    const { currentUser } = useAuth()

    return (
        <Route 
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/" />
            }}    
        ></Route>
    )
}
