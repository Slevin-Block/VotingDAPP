import React from 'react'
import { Input as ChakraInput} from '@chakra-ui/react'
import styles from './Input.module.css'


const Input = ( allProps ) => {
    const {register, field, ...props} = allProps
    return (
        <ChakraInput
            className={styles.input}
            {...register(field)}
            {...props}
        />
    )
}

export default Input