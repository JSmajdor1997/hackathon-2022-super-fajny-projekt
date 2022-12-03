import styles from "./styles.module.css"
import { Sling as Hamburger } from 'hamburger-react'

export interface Props {
    isHamburgerOn: boolean
    onHamburgerStateChanged: (newState: boolean) => void
    date?: Date
}

export default function NavBar(props: Props) {
    const {isHamburgerOn, onHamburgerStateChanged, date} = props

    return (
        <div className={styles["root"]}>
            <div className={styles["upper-part"]}>
                <Hamburger size={28} toggled={isHamburgerOn} color="black" toggle={()=>onHamburgerStateChanged(!isHamburgerOn)} />
            </div>

            {
                date== null ? 
                    null : 
                    <div className={styles["lower-part"]}>
                    <div className={styles["day-name-label"]}>
                        {date.toLocaleDateString("pl-PL", {weekday: "long"})}
                    </div>

                    <div className={styles["date-container"]}>
                        <div className={styles["bold-label"]}>
                            {date.getDate()}
                        </div>
                        &nbsp;
                        <div className={styles["bold-label"]}>
                            {date.toLocaleDateString("pl-PL", {month: "long"})}
                        </div>
                        &nbsp;
                        {date.getFullYear()}
                    </div>
                    </div>
            }
        </div>
    )
}