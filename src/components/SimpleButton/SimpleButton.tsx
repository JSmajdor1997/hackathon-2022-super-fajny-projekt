import { ReactNode } from "react"
import mergeClassesNames from "../../utils/mergeClassNames"
import Styllable from "../../utils/Styllable"
import styles from "./styles.module.css"

export interface Props extends Styllable {
    children: ReactNode
    onClick: ()=>void
}

export default function SimpleButton(props: Props){
    return (
        <div 
            className={mergeClassesNames([styles["root"]])} 
            style={props.style} 
            onClick={props.onClick}>
            {props.children}
        </div>
    )
}