import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const SelectedItem = (allProps) => {
    const {children, getValue, forceValue, ...props} = allProps
    const [value, setValue] = useState(false)

    useEffect(()=> setValue(forceValue), [forceValue])

    const handleChange = () => {
        setValue(!value)    // To the state
        getValue(value)     // To the parent
    }

    return (
        <Button
            {... props}
            colorScheme='cyan'
            variant={value ? 'outline' : 'ghost'}
            onClick={handleChange}
        >{children}</Button>
    )
}

export default SelectedItem