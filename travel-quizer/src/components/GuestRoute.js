import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

// Pages with this inside will redirect the user to the home page if the user is logged in
export default function GuestRoute({component: Component}, ...rest) {
    const { currentUser } = useAuth()

    return (
        <Route 
            {...rest}
            render={props => {
                return !currentUser ? <Component {...props} /> : <Redirect to="/" />
            }}    
        ></Route>
    )
}
