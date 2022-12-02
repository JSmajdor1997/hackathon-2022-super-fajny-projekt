import mergeClassesNames from "../../utils/mergeClassNames"
import styles from "./styles.module.css"

interface Props {
    className?: string
    style?: React.CSSProperties
}

export default function Calendar(props: Props) {
    return (
        <div style={props.style} className={mergeClassesNames([styles["root"], props.className])}>
            CALENDAR
        </div>
    )
}