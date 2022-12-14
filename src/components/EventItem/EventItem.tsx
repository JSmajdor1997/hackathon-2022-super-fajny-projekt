import MyEvent from "../../API/MyEvent"
import { ThemeColors } from "../../ThemeColors"
import formatHour from "../../utils/formatHour"
import mergeClassesNames from "../../utils/mergeClassNames"
import Styllable from "../../utils/Styllable"
import styles from "./styles.module.css"

export interface Props extends Styllable {
    event: MyEvent
    onShowDetails: (event: MyEvent)=>void
}

export default function EventItem(props: Props) {
    const {summary, location, difficulty, description, dateRange} = props.event

    return (
        <div
            className={mergeClassesNames([styles["root"], props.className])}
            onClick={()=>props.onShowDetails(props.event)}
            style={{...props.style, backgroundColor: ThemeColors.Random}}>
            <div className={styles["icon-container"]} >
                <img src="/images/idea-icon.png"/>
            </div>

            <div className={styles["main-container"]}>
                <div className={styles["title"]}>
                    {summary}
                </div>

                <div className={styles["location-or-description"]}>
                    {location ?? description}
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