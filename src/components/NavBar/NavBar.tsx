import styles from "./styles.module.css"
import { Sling as Hamburger } from 'hamburger-react'

export interface Props {
    isHamburgerOn: boolean
    onHamburgerStateChanged: (newState: boolean) => void
    date: Date
}

export default function NavBar(props: Props) {
    const {isHamburgerOn, onHamburgerStateChanged, date} = props

    return (
        <div className={styles["root"]}>
            <div className={styles["upper-part"]}>
                <div>
                    {formatDate(date)}
                </div>

                <div>
                    <Hamburger toggled={isHamburgerOn} color="white" toggle={()=>onHamburgerStateChanged(!isHamburgerOn)} />
                </div>
            </div>
            <div>
                {date.toLocaleDateString("pl-PL", {weekday: "long"})}
            </div>
        </div>
    )
}

function formatDate(date: Date): string {
    const dateNr = date.getDate()
    const monthName = date.toLocaleString('pl-PL', { month: 'long' })
    const year = date.getFullYear()

    return `${dateNr} ${monthName} ${year}`
}