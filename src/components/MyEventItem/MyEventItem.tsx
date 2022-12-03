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
            style={{...props.style, backgroundColor: tag[0] in colors ? colors[tag[0]] : ThemeColors.Work, opacity: 0.9}}>
            <div className={styles["icon-container"]} >
                <img src="/images/idea-icon.png"/>
            </div>

            <div style={{display: "flex", flexDirection: "column", flex: 1}}>
                <div className={styles["main-container"]}>
                    {"summary" in props.event ? (props.event as any)["summary"] : name}
                </div>

                <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                    {(props.event as any)["description"]}
                </div>
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