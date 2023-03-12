import { IconTrash, IconCheck, IconChecks } from '@tabler/icons-react';
import styles from './IconButton.module.css'

const IconButton = (allProps) => {
    const {icon, className : externalClasse, ...props} = allProps
    return (
        <button {...props} className={`${styles.base} ${externalClasse}`}>
            {icon === 'trash' && <IconTrash size="1.125rem" className={styles.icon} />}
            {icon === 'check' && <IconCheck size="1.125rem" className={styles.icon} />}
            {icon === 'checks' && <IconChecks size="1.125rem" className={styles.icon} />}
        </button>
    )
}

export default IconButton