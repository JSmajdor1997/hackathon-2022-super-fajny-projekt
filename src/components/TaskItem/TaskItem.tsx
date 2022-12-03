import { Difficulty } from "../../API/Difficulty"
import { ThemeColors } from "../../ThemeColors"
import mergeClassesNames from "../../utils/mergeClassNames"
import Styllable from "../../utils/Styllable"
import DifficultyDisplay from "../DifficultyDisplay/DifficultyDisplay"
import styles from "./styles.module.css"

export interface Props extends Styllable {
    difficulty: Difficulty
    name: string
}

export default function TaskItem(props: Props) {
    const {difficulty, name} = props

    const colorsMap = {
        [Difficulty.Easy]: ThemeColors.SelfCare,
        [Difficulty.Medium]: ThemeColors.Yellow,
        [Difficulty.Hard]: ThemeColors.Work,
    }

    return (
        <div 
            className={mergeClassesNames([styles["root"], props.className])} 
            style={{backgroundColor: colorsMap[difficulty], ...props.style}}>
            <div className={styles["header"]}>
                {name}
            </div>

            <DifficultyDisplay 
                color="white"
                className={styles["difficulty"]}
                difficulty={difficulty}/>
        </div>
    )
}