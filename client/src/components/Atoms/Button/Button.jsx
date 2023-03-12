import React from 'react'
import styles from './Button.module.css'
import { Button as ChakraButton} from '@chakra-ui/react'

const Button = (allProps) => {
    const {children, className : externalClass, ...props} = allProps
    return (
        <button {...props} className={`${styles.button} ${externalClass}`}>
            {children}
        </button>
    )
}

export default Button