import React from 'react'
import "./css/Section.css"

export default function Section({ children, ...rest }) {
    return (
        <div className="section" {...rest}>
            {children}
        </div>
    )
}
