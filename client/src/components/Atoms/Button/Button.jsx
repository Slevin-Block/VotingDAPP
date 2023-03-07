import React from 'react'


const Button = (allProps) => {
    const {children, ...props} = allProps
    return (
        <button {...props}>{children}</button>
    )
}

export default Button