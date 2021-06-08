import React from 'react'
import LogoutButton from '../components/LogoutButton'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
    const { currentUser } = useAuth() 
    console.log(currentUser)
    return (
        <div>
            <p>{currentUser.email}</p>
            <LogoutButton>Logout</LogoutButton>
        </div>
    )
}
