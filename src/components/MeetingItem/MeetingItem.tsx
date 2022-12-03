import mergeClassesNames from "../../utils/mergeClassNames"
import Styllable from "../../utils/Styllable"
import SimpleList from "../SimpleList/SimpleList"
import styles from "./styles.module.css"

export interface Props extends Styllable {

}

export default function MeetingItem(props: Props) {
    return (
        <div className={mergeClassesNames([styles["root"], props.className])} style={props.style}>
            <div className={styles["photo-container"]}>
                <img src="https://i.gremicdn.pl/image/free/2042e815ec347f2c640c04c12ac26941/?t=crop:1920:1191:nowe:0:86,resize:fill:408:255,enlarge:1"/>
            </div>

            <SimpleList
                className={styles["info-container"]}
                header={<div className={styles["name"]}>Elon Piżmo</div>}
                items={["środa 6.11, 17:00", "środa 6.11, 17:00", "środa 6.11, 17:00"]}
                renderItem={it => (
                    <div>
                        {it}
                    </div>
                )}/>
        </div>
    )
}