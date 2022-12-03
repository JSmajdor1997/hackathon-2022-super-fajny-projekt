import MyEvent, { MyCustomEvent } from "../../API/MyEvent"
import { ThemeColors } from "../../ThemeColors"
import formatHour from "../../utils/formatHour"
import mergeClassesNames from "../../utils/mergeClassNames"
import Styllable from "../../utils/Styllable"
import DifficultyDisplay from "../DifficultyDisplay/DifficultyDisplay"
import styles from "./styles.module.css"

export interface Props extends Styllable {
    event: MyCustomEvent
    onShowDetails: (event: MyCustomEvent)=>void
}

export default function MyEventItem(props: Props) {
    const {name, taskprogress, difficulty, tag, dateRange} = props.event

    const colors: {[key in any]: string} = {
        "Green": ThemeColors.SelfCare,
        "Blue": ThemeColors.Random,
        "Grey": ThemeColors.LightGray,
        "Yellow": ThemeColors.Yellow
    }

    return (
        <div
            className={mergeClassesNames([styles["root"], props.className])}
            onClick={()=>props.onShowDetails(props.event)} 
            style={{...props.style, backgroundColor: colors[tag[0]]}}>
            <div className={styles["icon-container"]} >
                <img src="/images/idea-icon.png"/>
            </div>

            <div className={styles["main-container"]}>
                <div className={styles["title"]}>
                    {name}
                </div>

                <DifficultyDisplay color="black" difficulty={difficulty}/>
            </div>

            <div>
                PROGRESS: {taskprogress}
            </div>

            <div className={styles["hours-container"]}>
                <div className={styles["from"]}>
                    {formatHour(dateRange.from)}
                </div>

                <div className={styles["to"]}>
                    {formatHour(dateRange.to)}
                </div>
            </div>
        </div>
    )
}