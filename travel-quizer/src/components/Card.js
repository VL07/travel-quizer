import React from 'react'
import "./css/Card.css"

export default function Card({ children, ...rest }) {
    return (
        <div className="card" {...rest}>
            {children}
        </div>
    )
}
