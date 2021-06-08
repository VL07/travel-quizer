import React, { useRef } from 'react'

export default function Signup() {
    emailRef = useRef()
    passwordRef = useRef()
    repeatPasswordRef = useRef()

    function onSubmit(e) {
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={onSubmit} >
                <input type="email" ref={emailRef} placeholder="Email" name="email" />
                <input type="password" ref={emailRef} placeholder="Password" name="password" />
                <input type="password" ref={emailRef} placeholder="Confirm password" name="repeat-password" />
                <input type="submit" name="submit" />
            </form>
        </div>
    )
}
