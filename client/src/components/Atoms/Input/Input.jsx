import React from 'react'


const Input = ( allProps ) => {
    const {register, field, ...props} = allProps
    return (
        <input {...register(field)} {...props}/>
    )
}

export default Input