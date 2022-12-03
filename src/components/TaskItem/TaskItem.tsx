import { Difficulty } from "../../API/MyEvent"
import Theme from "../../Theme"
import mergeClassesNames from "../../utils/mergeClassNames"
import Styllable from "../../utils/Styllable"
import DifficultyDisplay from "../DifficultyDisplay/DifficultyDisplay"
import styles from "./styles.module.css"

export interface Props extends Styllable {
    difficulty: Difficulty
}

export default function TaskItem(props: Props) {
    const {difficulty} = props

    return (
        <div 
            className={mergeClassesNames([styles["root"], props.className])} 
            style={{backgroundColor: Theme.difficultyToColor(difficulty), ...props.style}}>
            <div className={styles["header"]}>
                Zjeść obiad
            </div>

            <DifficultyDisplay 
                color="white"
                className={styles["difficulty"]}
                difficulty={Difficulty.Easy}/>
        </div>
    )
}