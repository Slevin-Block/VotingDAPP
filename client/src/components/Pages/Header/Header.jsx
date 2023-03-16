import React from 'react'
import { WORKFLOWSTATUS } from '../../../provider/Workflow '
import AddressField from '../../Atoms/AddressField/AddressField'
import RuleField from '../../Atoms/RuleField/RuleField'
import styles from './Header.module.css'
const Header = ({workflow,  account, ownerAddress, rule}) => {

const minifyStr = (str) => {
        let temporary = str
        if (str) {
            temporary = `${str.slice(0,6)}...${str.slice(-4)}`
            temporary = temporary.toLowerCase()
        }
        return temporary
    }
    return (
        <header className={styles.header}>
            <div className={styles.infos}>
                <RuleField>{rule}</RuleField>
                <div className={styles.title}>
                   <h1>VOTING SESSION</h1>
                    <p>{`Owner : ${minifyStr(ownerAddress)}`}</p>
                </div>
                
                <AddressField>{minifyStr(account)}</AddressField>
            </div>
            <div className={styles.workflowGroup}>
                {WORKFLOWSTATUS.map((wf, i) =>
                    <p key={i} className={`${styles.workflow} ${workflow === i ? styles.selected : ''}`}>
                        {`${i}-${wf}`}
                    </p>
                )}
            </div>
        </header>
    )
}

export default Header