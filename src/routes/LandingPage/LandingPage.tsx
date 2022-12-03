import { Outlet, Link } from "react-router-dom";
import { RoutesEnum } from "../RoutesEnum";
import styles from "./styles.module.css"

export default function LandingPage() {
    return (
        <div>
            Landing Page
            <Link to={RoutesEnum.Main}>Zaloguj</Link>
        </div>
    )
}