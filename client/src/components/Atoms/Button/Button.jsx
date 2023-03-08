import React from 'react'
import { Button as ChakraButton} from '@chakra-ui/react'

const Button = (allProps) => {
    const {children, ...props} = allProps
    return (
        <ChakraButton colorScheme='cyan' {...props}>{children}</ChakraButton>
    )
}

export default Button