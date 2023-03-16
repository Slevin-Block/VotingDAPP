import { IconRuler } from '@tabler/icons-react'
import React from 'react'
import styles from './RuleField.module.css'

const RuleField = ({children}) => {
    return (
        <div className={styles.field}> <IconRuler className={styles.icon}/> {children}</div>
    )
}

export default RuleField