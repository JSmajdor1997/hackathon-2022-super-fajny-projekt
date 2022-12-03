import styles from "./styles.module.css"
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import mergeClassesNames from "../../utils/mergeClassNames"
import SimpleList from "../SimpleList/SimpleList"
import MeetingItem from "../MeetingItem/MeetingItem"
import TaskItem from "../TaskItem/TaskItem"

export interface Props {
    isOpen: boolean
    onClose: ()=>void
}

export default function ToDoDrawer(props: Props) {
    return (
        <Drawer
            open={props.isOpen}
            onClose={props.onClose}
            direction="right"
            className={styles["root"]}>
            <SimpleList 
                items={["1", "2"]}
                header={
                    <div className={styles["header"]}>
                        Twoje zadania
                        <img src="/images/add-icon.png"/>
                    </div>
                } 
                className={styles["tasks-section"]}
                renderItem={it => (
                    <TaskItem/>
            )}/>

            <div className={styles["middle-section"]}>
                <div className={styles["left"]}>
                    <img src="https://i.gremicdn.pl/image/free/2042e815ec347f2c640c04c12ac26941/?t=crop:1920:1191:nowe:0:86,resize:fill:408:255,enlarge:1"/>

                    <div className={styles["name"]}>
                        Elon Musk
                    </div>
                </div>

                <div className={styles["right"]}>
                    <div className={mergeClassesNames([styles["button"], styles["mute-button"]])}>
                        <img src="/images/mute-icon.png"/>
                    </div>

                    <div className={mergeClassesNames([styles["button"], styles["settings-button"]])}>
                        <img src="/images/settings-icon.png"/>
                    </div>
                </div>
            </div>

            <SimpleList 
                items={["1", "2"]}
                header="A może spotkanie?" 
                className={styles["meetings-section"]}
                renderItem={it => (
                    <MeetingItem/>
                )}/>
            
            <div className={styles["logout-section"]}>
                Wyloguj
            </div>
        </Drawer>
)
}