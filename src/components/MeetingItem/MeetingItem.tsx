import MyMeeting from "../../API/MyMeeting"
import mergeClassesNames from "../../utils/mergeClassNames"
import Styllable from "../../utils/Styllable"
import SimpleList from "../SimpleList/SimpleList"
import styles from "./styles.module.css"

export interface Props extends Styllable {
    meeting: MyMeeting
}

const photos = [
    "1.png",
    "3.png",
    "2.png",
]

export default function MeetingItem(props: Props) {
    const {id, name, suggested_meeting, image, createdAt} = props.meeting
 
    return (
        <div key={id} className={mergeClassesNames([styles["root"], props.className])} style={props.style}>
            <div className={styles["photo-container"]}>
                <img src={`/images/people/${photos[image-1]}`}/>
            </div>

            <SimpleList
                className={styles["info-container"]}
                header={<div className={styles["name"]}>{name}</div>}
                items={suggested_meeting}
                renderItem={it => (
                    <div key={it.toISOString()} className={styles["time-suggestion"]}>
                        {it.toLocaleDateString("pl-PL", {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})}
                    </div>
                )}/>
        </div>
    )
}