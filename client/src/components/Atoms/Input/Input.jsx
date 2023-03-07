import React from 'react'
import { Input as ChakraInput} from '@chakra-ui/react'


const Input = ( allProps ) => {
    const {register, field, ...props} = allProps
    return (
        <ChakraInput  {...register(field)} {...props} />
    )
}

export default Input