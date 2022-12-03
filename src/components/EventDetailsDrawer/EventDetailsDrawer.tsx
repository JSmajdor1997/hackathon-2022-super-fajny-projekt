import styles from "./styles.module.css"
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import MyEvent from "../../API/MyEvent"
import React from "react"
import DifficultyDisplay from "../DifficultyDisplay/DifficultyDisplay"
import formatHour from "../../utils/formatHour"
import ReactSlider from 'react-slider'

export interface Props {
    event: MyEvent | null
    onClose: ()=>void
}

export default function EventDetailsDrawer(props: Props) {
    const renderContent = (event: MyEvent) => {
        const {summary, description, dateRange, difficulty, progress, location} = event

        return (
            <React.Fragment>
                <div className={styles["header"]}>
                    <div className={styles["title"]}>
                        {summary}

                        <DifficultyDisplay color="black" difficulty={difficulty}/>
                    </div>
    
                    <div className={styles["hour"]}>
                        {formatHour(dateRange.from)}
                    </div>
                </div>
    
                <div className={styles["location"]}>
                    {location ?? "zdalnie"}
                </div>
    
                <div className={styles["description"]}>
                    {description}
                </div>
    
                <div className={styles["progress"]}>
                    <ReactSlider
                    value={0}
                    min={0}
                    max={100}
                    onChange={it => console.log(it)}
                        className={styles["progress-slider"]}
                        thumbClassName={styles["progress-thumb"]}
                        trackClassName={styles["progress-track"]}
                        renderThumb={(props, state) => <div {...props}/>}
                    />
                </div>

                <div className={styles["map-container"]}>
                    <img src="/images/map.png"/>
                </div>
            </React.Fragment>
        )
    }

    return (
        <Drawer
            overlayColor="white"
            open={props.event != null}
            onClose={props.onClose}
            direction="bottom"
            className={styles["root"]}>
                <div className={styles["content-container"]}>
                    {props.event == null ? null : renderContent(props.event)}
                </div>
        </Drawer>
    )
}