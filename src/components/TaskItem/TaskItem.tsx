import { Difficulty } from "../../API/MyEvent"
import mergeClassesNames from "../../utils/mergeClassNames"
import Styllable from "../../utils/Styllable"
import DifficultyDisplay from "../DifficultyDisplay/DifficultyDisplay"
import styles from "./styles.module.css"

export interface Props extends Styllable {

}

export default function TaskItem(props: Props) {
    return (
        <div className={mergeClassesNames([styles["root"], props.className])} style={props.style}>
            <div className={styles["header"]}>Zjeść obiad</div>

            <DifficultyDisplay className={styles["difficulty"]} difficulty={Difficulty.Easy}/>
        </div>
    )
}