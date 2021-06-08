import React, { useRef } from 'react'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const repeatPasswordRef = useRef()

    function onSubmit(e) {
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={onSubmit} >
                <input type="email" ref={emailRef} placeholder="Email" name="email" />
                <input type="password" ref={passwordRef} placeholder="Password" name="password" />
                <input type="password" ref={repeatPasswordRef} placeholder="Confirm password" name="repeat-password" />
                <input type="submit" name="submit" />
            </form>
        </div>
    )
}
