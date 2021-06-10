import React from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import "./css/LogoutButton.css"

export default function LogoutButton({children, ...rest}) {
    const { logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        try {
            await logout()
            history.push("/")
        } catch {
            console.warn("failed to log out")
        }
    }

    return (
        <button className="logout-btn" onClick={handleLogout} {...rest}>
            {children}
        </button>
    )
}
