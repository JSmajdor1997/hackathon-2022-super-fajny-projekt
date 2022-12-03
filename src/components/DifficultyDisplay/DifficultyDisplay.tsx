import { Difficulty } from "../../API/MyEvent"
import mergeClassesNames from "../../utils/mergeClassNames"
import Styllable from "../../utils/Styllable"
import styles from "./styles.module.css"

export interface Props extends Styllable {
    difficulty: Difficulty
    color: string
}

export default function DifficultyDisplay(props: Props) {
    const {difficulty, className, style} = props

    const isThirdFull = difficulty == Difficulty.Hard
    const isSecondFull = isThirdFull || difficulty == Difficulty.Medium
    const isFirstFull =  difficulty == Difficulty.Medium || difficulty == Difficulty.Easy || difficulty == Difficulty.Hard

    return (
        <div className={mergeClassesNames([styles["root"], className])} style={style}>
            <div 
                style={{borderColor: props.color, background: isFirstFull ? props.color : "unset"}}
                className={mergeClassesNames([styles["dot-outline"]])}/>

            <div 
                style={{borderColor: props.color, background: isSecondFull ? props.color : "unset"}}
                className={mergeClassesNames([styles["dot-outline"]])}/>

            <div 
                style={{borderColor: props.color, background: isThirdFull ? props.color : "unset"}}
                className={mergeClassesNames([styles["dot-outline"]])}/>
        </div>
    )
}