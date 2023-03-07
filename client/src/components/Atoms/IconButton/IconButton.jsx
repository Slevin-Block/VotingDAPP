
import { IconTrash } from '@tabler/icons-react';

const IconButton = (allProps) => {
    const {icon, ...props} = allProps
    return (
        <button {...props}>
            <IconTrash size="1.125rem" />
        </button>
    )
}

export default IconButton