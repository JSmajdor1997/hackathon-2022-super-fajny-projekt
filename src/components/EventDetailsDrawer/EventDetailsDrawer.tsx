import styles from "./styles.module.css"
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import MyEvent from "../../API/MyEvent"
import React from "react"
import DifficultyDisplay from "../DifficultyDisplay/DifficultyDisplay"
import formatHour from "../../utils/formatHour"
import ReactSlider from 'react-slider'
import GoogleMapReact from "google-map-react"

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
                    </div>

                    <DifficultyDisplay className={styles["difficulty"]} difficulty={difficulty}/>
    
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
                    value={1}
                    min={0}
                    max={100}
                        className={styles["difficulty-slider"]}
                        thumbClassName={styles["difficulty-thumb"]}
                        trackClassName={styles["difficulty-track"]}
                        renderThumb={(props, state) => <div {...props}/>}
                    />
                </div>

                <div className={styles["map-container"]}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyCYfZS0gWEtQ9cbGPRh8FA3A4bekhPiCfE" }}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => {}}
                        >
                        
                    </GoogleMapReact>
                </div>
            </React.Fragment>
        )
    }

    return (
        <Drawer
            open={props.event != null}
            onClose={props.onClose}
            direction="bottom"
            className={styles["root"]}>
                {props.event == null ? null : renderContent(props.event)}
        </Drawer>
)
}