import React from 'react'
import "./css/FlexRight.css"

export default function FlexRight({ children, ...rest }) {
    return (
        <div className="flex-right" {...rest}>
            {children}
        </div>
    )
}
