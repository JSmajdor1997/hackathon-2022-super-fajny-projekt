import styles from "./styles.module.css"
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

export interface Props {
    isOpen: boolean
    onClose: ()=>void
}

export default function ToDoDrawer(props: Props) {
    return (
        <Drawer
            open={props.isOpen}
            onClose={props.onClose}
            direction="top"
            className=''>
                <div></div>
        </Drawer>
)
}