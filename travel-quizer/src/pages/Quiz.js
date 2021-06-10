import React from 'react'
import { useParams } from 'react-router'

export default function Quiz() {
    // get url parameters
    const { id } = useParams()

    return (
        <div>
            quiz {id}
        </div>
    )
}
