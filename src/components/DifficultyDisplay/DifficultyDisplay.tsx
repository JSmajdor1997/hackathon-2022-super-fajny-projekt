import { Difficulty } from "../../API/MyEvent"
import mergeClassesNames from "../../utils/mergeClassNames"
import Styllable from "../../utils/Styllable"
import styles from "./styles.module.css"

export interface Props extends Styllable {
    difficulty: Difficulty
}

export default function DifficultyDisplay(props: Props) {
    const {difficulty, className, style} = props

    return (
        <div className={mergeClassesNames([styles["root"], className])} style={style}>
            <div 
                className={mergeClassesNames([styles["dot-outline"], {class: styles["dot-full"], condition: difficulty == Difficulty.Easy || difficulty == Difficulty.Medium || difficulty == Difficulty.Hard}])}/>

            <div 
                className={mergeClassesNames([styles["dot-outline"], {class: styles["dot-full"], condition: difficulty == Difficulty.Easy || difficulty == Difficulty.Medium}])}/>

            <div 
                className={mergeClassesNames([styles["dot-outline"], {class: styles["dot-full"], condition: difficulty == Difficulty.Hard}])}/>
        </div>
    )
}