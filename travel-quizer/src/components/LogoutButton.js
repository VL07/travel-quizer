import React from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

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
        <button variant="danger" onClick={handleLogout} {...rest}>
            {children}
        </button>
    )
}
