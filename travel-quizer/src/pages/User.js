import React from 'react'
import { useParams } from 'react-router'

export default function User() {
    // geting dynamic url parameter
    const { id } = useParams()

    return (
        <div>
            Hello user {id}
        </div>
    )
}
