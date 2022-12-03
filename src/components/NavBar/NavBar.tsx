import styles from "./styles.module.css"
import { Sling as Hamburger } from 'hamburger-react'

export interface Props {
    isHamburgerOn: boolean
    onHamburgerStateChanged: (newState: boolean) => void
    date?: Date
    hamburgerPosition: "left" | "right"
}

export default function NavBar(props: Props) {
    const {isHamburgerOn, onHamburgerStateChanged, date, hamburgerPosition} = props

    return (
        <div className={styles["root"]}>
            <div className={styles["upper-part"]} style={{justifyContent: hamburgerPosition == "left" ? "flex-start":"flex-end"}}>
                {hamburgerPosition == 'left' ? 
                    <img style={{cursor: "pointer", width: 15, marginLeft: 25}} src="/images/chevron-left.png" onClick={()=>onHamburgerStateChanged(!isHamburgerOn)}/> :
                    <Hamburger size={28} toggled={isHamburgerOn} color="black" toggle={()=>onHamburgerStateChanged(!isHamburgerOn)} />
                    }
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