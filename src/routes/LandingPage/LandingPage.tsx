import { Outlet, Link } from "react-router-dom";
import styles from "./styles.module.css"

export default function LandingPage() {
    return (
        <div>
            Landing Page
            <Link to="/">Zaloguj</Link>
        </div>
    )
}