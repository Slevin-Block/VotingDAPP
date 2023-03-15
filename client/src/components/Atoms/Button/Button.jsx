import React from 'react'
import styles from './Button.module.css'

const Button = (allProps) => {
    const {children, className : externalClass, ...props} = allProps
    return (
        <button {...props} className={`${styles.button} ${externalClass}`}>
            {children}
        </button>
    )
}

export default Button