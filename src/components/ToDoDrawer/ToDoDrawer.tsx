import styles from "./styles.module.css"
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import mergeClassesNames from "../../utils/mergeClassNames"
import SimpleList from "../SimpleList/SimpleList"
import MeetingItem from "../MeetingItem/MeetingItem"
import TaskItem from "../TaskItem/TaskItem"
import NavBar from "../NavBar/NavBar"
import SimpleButton from "../SimpleButton/SimpleButton"
import MyMeeting from "../../API/MyMeeting"
import { Difficulty } from "../../API/Difficulty"
import MyToDo from "../../API/MyToDo"

export interface Props {
    isOpen: boolean
    onClose: ()=>void

    onLogOut: ()=>void

    meetings: MyMeeting[]
    toDos: MyToDo[]
    onOpenSettings: ()=>void
    onMuteApp: ()=>void
    onAddTask: ()=>void
}

export default function ToDoDrawer(props: Props) {
    return (
        <Drawer
            size="100vw"
            overlayColor="white"
            open={props.isOpen}
            onClose={props.onClose}
            direction="right"
            className={styles["root"]}>
            <NavBar isHamburgerOn={props.isOpen} onHamburgerStateChanged={props.onClose}/>

            <div className={styles["content-container"]}>
            <SimpleList 
                items={props.toDos}
                header={
                    <div className={styles["header"]}>
                        Twoje zadania
                        <img src="/images/add-icon.png"/>
                    </div>
                }
                className={styles["tasks-section"]}
                renderItem={(it) => (
                    <TaskItem name={it.name} key={it.name} difficulty={it.difficulty}/>
            )}/>

            <div className={styles["middle-section"]}>
                <div className={styles["left"]}>
                    <img src="/images/people/4.jpg"/>

                    <div className={styles["name"]}>
                        Władek Rodriguez
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
                items={props.meetings}
                header={
                    <div className={styles["header"]}>
                        A może spotkanie?
                    </div>
                }
                className={styles["meetings-section"]}
                renderItem={it => (
                    <MeetingItem meeting={it} key={it.id}/>
                )}/>

            <SimpleButton onClick={props.onLogOut} className={styles["logout-button"]}>
                Wyloguj się
            </SimpleButton>
            </div>
        </Drawer>
)
}