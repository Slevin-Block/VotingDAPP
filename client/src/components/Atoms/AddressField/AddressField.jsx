import { IconUser } from '@tabler/icons-react'
import React from 'react'
import styles from './AddressField.module.css'

const AddressField = ({children}) => {
    return (
        <div className={styles.field}> <IconUser className={styles.icon}/> {children}</div>
    )
}

export default AddressField